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

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

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

    @KafkaListener(topics = "booking.seat.held", groupId = "booking-group")
    public void listenSeatHeld(String message, Acknowledgment ack) {
        try {
            SeatHeldEvent event = objectMapper.readValue(message, SeatHeldEvent.class);
            log.info("Received SeatHeldEvent: {}", event);
            GetShowResponse showCached = distributedCacheService.getObject(getShowSeatKey(event.getShowId()), GetShowResponse.class);
            event.getHeldSeats().forEach(seat -> {
                showCached.getSeats().forEach(seatCache -> {
                    if (seat == seatCache.getShowSeatId()) {
                        seatCache.setSeatState(SeatStateEnum.HELD);
                    }
                });
            });

            distributedCacheService.setObjectTTL(getShowSeatKey(event.getShowId()), showCached, 5L, TimeUnit.MINUTES);
            log.info("Update showCached: {}", event.getShowId());


            Optional<UserEntity> userEntity = userRepository.findByUserEmail(event.getUserEmail());
            UserEntity user = userEntity.get();

            List<ShowSeatEntity> seatsToUpdate = event.getHeldSeats().stream()
                    .map(showSeatRepository::findById)
                    .filter(Optional::isPresent)
                    .map(Optional::get)
                    .peek(seat -> seat.setSeatState(SeatStateEnum.HELD))
                    .toList();

            int totalPrice = seatsToUpdate.stream()
                    .mapToInt(ShowSeatEntity::getSeatPrice)
                    .sum();

            BookingEntity bookingEntity = BookingEntity.builder()
                    .bookingId(event.getBookingId())
                    .bookingNumberOfSeats(event.getHeldSeats().size())
                    .bookingState(BookingStateEnum.PENDING)
                    .bookingTotalPrice(BigDecimal.valueOf(totalPrice))
                    .show(ShowEntity.builder()
                            .showId(event.getShowId())
                            .build())
                    .user(user)
                    .build();

            bookingRepository.save(bookingEntity);

            seatsToUpdate.forEach(seat -> {
                seat.setBooking(bookingEntity);
            });
            showSeatRepository.saveAll(seatsToUpdate);

            log.info("Update booking: {}", event.getBookingId());
            ack.acknowledge();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private String getShowSeatKey(int showId) {
        return "show:" + showId;
    }
}
