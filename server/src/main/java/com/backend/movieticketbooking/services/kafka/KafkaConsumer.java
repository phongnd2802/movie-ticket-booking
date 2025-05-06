package com.backend.movieticketbooking.services.kafka;


import com.backend.movieticketbooking.dtos.show.response.GetShowResponse;
import com.backend.movieticketbooking.entities.auth.UserEntity;
import com.backend.movieticketbooking.entities.booking.BookingEntity;
import com.backend.movieticketbooking.entities.show.ShowEntity;
import com.backend.movieticketbooking.entities.show.ShowSeatEntity;
import com.backend.movieticketbooking.enums.BookingStateEnum;
import com.backend.movieticketbooking.enums.SeatStateEnum;
import com.backend.movieticketbooking.repositories.BookingRepository;
import com.backend.movieticketbooking.repositories.ShowSeatRepository;
import com.backend.movieticketbooking.repositories.UserRepository;
import com.backend.movieticketbooking.services.booking.event.SeatHeldEvent;
import com.backend.movieticketbooking.services.cache.distributed.DistributedCacheService;
import com.backend.movieticketbooking.services.email.EmailService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.Acknowledgment;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class KafkaConsumer {

    EmailService emailService;

    ObjectMapper objectMapper;

    DistributedCacheService distributedCacheService;

    BookingRepository bookingRepository;

    ShowSeatRepository showSeatRepository;

    UserRepository userRepository;

    @KafkaListener(topics = "otp-auth-topic", groupId = "otp-group-id")
    public void listenOTP(String message, Acknowledgment ack) {
        try {
            JsonNode jsonNode = objectMapper.readTree(message);
            String email = jsonNode.get("email").asText();
            String otp = jsonNode.get("otp").asText();
            log.info("otp is {}, email is {}", otp, email);

            emailService.sendTextEmail(email, "OTP for email verification", otp);
            ack.acknowledge();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Transactional
    @KafkaListener(topics = "booking-seat-held", groupId = "booking-group")
    public void listenSeatHeld(String message, Acknowledgment ack) {
        try {
            // 1. Parse message
            SeatHeldEvent event = objectMapper.readValue(message, SeatHeldEvent.class);
            log.info("Received SeatHeldEvent: {}", event);


            // 3. Lấy thông tin người dùng
            Optional<UserEntity> userEntity = userRepository.findByUserEmail(event.getUserEmail());
            UserEntity user = userEntity.get();

            // 4. Lấy các ShowSeatEntity và tính tổng giá
            List<ShowSeatEntity> seatsToUpdate = event.getHeldSeats().stream()
                    .map(showSeatRepository::findById)
                    .filter(Optional::isPresent)
                    .map(Optional::get)
                    .collect(Collectors.toList());

            int totalPrice = seatsToUpdate.stream()
                    .mapToInt(ShowSeatEntity::getSeatPrice)
                    .sum();

            // 5. Tạo booking entity
            BookingEntity bookingEntity = BookingEntity.builder()
                    .bookingId(event.getBookingId())
                    .bookingNumberOfSeats(seatsToUpdate.size())
                    .bookingState(BookingStateEnum.PENDING)
                    .bookingTotalPrice(BigDecimal.valueOf(totalPrice))
                    .show(ShowEntity.builder().showId(event.getShowId()).build())
                    .user(user)
                    .build();

            bookingRepository.saveAndFlush(bookingEntity);

            // 6. Gán booking và cập nhật trạng thái ghế
            seatsToUpdate.forEach(seat -> {
                seat.setSeatState(SeatStateEnum.HELD);
                seat.setBooking(bookingEntity);
            });
            showSeatRepository.saveAll(seatsToUpdate);

            log.info("Booking created and seats updated for bookingId={}", event.getBookingId());

            GetShowResponse showCached = distributedCacheService.getObject(getShowSeatKey(event.getShowId()), GetShowResponse.class);
            if (showCached != null) {
                event.getHeldSeats().forEach(heldSeatId -> {
                    showCached.getSeats().forEach(seat -> {
                        if (heldSeatId.equals(seat.getShowSeatId())) {
                            seat.setSeatState(SeatStateEnum.HELD);
                        }
                    });
                });

                distributedCacheService.setObjectTTL(getShowSeatKey(event.getShowId()), showCached, 5L, TimeUnit.MINUTES);
                log.info("Updated cached show for showId={}", event.getShowId());
            }
            ack.acknowledge(); // 7. Commit offset
        } catch (Exception e) {
            log.error("Failed to process SeatHeldEvent", e);
            throw new RuntimeException(e);
        }
    }

    private String getShowSeatKey(int showId) {
        return "show:" + showId;
    }
}
