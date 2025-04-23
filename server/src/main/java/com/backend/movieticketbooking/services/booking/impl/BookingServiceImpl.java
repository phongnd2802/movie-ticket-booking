package com.backend.movieticketbooking.services.booking.impl;

import com.backend.movieticketbooking.common.ErrorCode;
import com.backend.movieticketbooking.dtos.booking.request.SelectSeatsRequest;
import com.backend.movieticketbooking.dtos.booking.response.SelectSeatsResponse;
import com.backend.movieticketbooking.dtos.show.response.GetShowResponse;
import com.backend.movieticketbooking.enums.SeatStateEnum;
import com.backend.movieticketbooking.exceptions.BadRequestException;
import com.backend.movieticketbooking.services.booking.BookingService;
import com.backend.movieticketbooking.services.booking.event.SeatHeldEvent;
import com.backend.movieticketbooking.services.cache.distributed.DistributedCacheService;
import com.backend.movieticketbooking.services.kafka.KafkaProducer;
import com.backend.movieticketbooking.services.lock.DistributedLockService;
import com.backend.movieticketbooking.services.lock.DistributedLocker;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BookingServiceImpl implements BookingService {

    @Autowired
    DistributedLockService distributedLockService;

    @Autowired
    DistributedCacheService distributedCacheService;

    @Autowired
    KafkaProducer kafkaProducer;

    @Autowired
    ObjectMapper objectMapper;

    @Override
    public SelectSeatsResponse selectSeats(SelectSeatsRequest request, String userEmail) {
        // Sort seat IDs to prevent deadlocks
        List<Integer> seats = request.getSeats().stream().sorted().toList();
        log.info("Selecting seats: {}", seats);
        log.info("User email: {}", userEmail);

        List<String> lockedKeys = new ArrayList<>();
        List<Integer> heldSuccessfully = new ArrayList<>();

        try {
            // 1. Lock all seats first
            for (Integer seat : seats) {
                String key = getHoldSeatBookingKey(seat);
                DistributedLocker locker = distributedLockService.getDistributedLock(key);
                boolean locked = locker.tryLock(500, 2000, TimeUnit.MILLISECONDS); // small timeout
                if (!locked) {
                    throw new BadRequestException(ErrorCode.SEAT_IS_HELD);
                }
                lockedKeys.add(key);
            }

            // 2. After locking all seats, check if any seat is already held
            GetShowResponse showCached = distributedCacheService.getObject(getShowSeatKey(request.getShowId()), GetShowResponse.class);
            for (Integer seat : seats) {
                boolean isHeld = showCached.getSeats().stream()
                        .anyMatch(seatCache -> seat.equals(seatCache.getShowSeatId()) && seatCache.getSeatState() == SeatStateEnum.HELD);
                if (isHeld) {
                    throw new BadRequestException(ErrorCode.SEAT_IS_HELD);
                }
                heldSuccessfully.add(seat);
            }

            // 3. All seats can be held → Send event to Kafka
            String bookingId = UUID.randomUUID().toString();
            SeatHeldEvent seatHeldEvent = SeatHeldEvent.builder()
                    .showId(request.getShowId())
                    .bookingId(bookingId)
                    .userEmail(userEmail)
                    .heldSeats(heldSuccessfully)
                    .build();
            String messageJson = objectMapper.writeValueAsString(seatHeldEvent);
            kafkaProducer.sendAsync("booking.seat.held", messageJson);

            return SelectSeatsResponse.builder()
                    .bookingId(bookingId)
                    .failedToHold(Collections.emptyList())
                    .heldSuccessfully(heldSuccessfully)
                    .build();

        } catch (BadRequestException e) {
            log.warn("Seat hold failed: {}", e.getMessage());
            throw e;
        } catch (Exception e) {
            log.error("Unexpected error: {}", e.getMessage(), e);
            throw new RuntimeException("Error while selecting seats", e);
        } finally {
            // 4. Always unlock in finally block
            for (String lockedKey : lockedKeys) {
                DistributedLocker locker = distributedLockService.getDistributedLock(lockedKey);
                if (locker.isHeldByCurrentThread()) {
                    locker.unlock();
                }
            }
        }
    }

    private String getHoldSeatBookingKey(int showSeatId) {
        return "BOOKING:HOLD:SEAT:" + showSeatId;
    }

    private String getShowSeatKey(int showId) {
        return "show:" + showId;
    }
}
