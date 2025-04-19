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
import com.backend.movieticketbooking.services.kafka.message.OtpMessage;
import com.backend.movieticketbooking.services.lock.DistributedLockService;
import com.backend.movieticketbooking.services.lock.DistributedLocker;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
        List<Integer> seats = request.getSeats();
        log.info(seats.toString());
        log.info(userEmail);

        List<String> lockedKeys = new ArrayList<>();
        List<Integer> heldSuccessfully = new ArrayList<>();
        List<Integer> failedToHold = new ArrayList<>();

        try {
            for (Integer seat : seats) {
                String key = getHoldSeatBookingKey(seat);
                DistributedLocker locker = distributedLockService.getDistributedLock(key);
                boolean locked = locker.tryLock(0, 10, TimeUnit.MINUTES);
                if (!locked) {
                    failedToHold.add(seat);
                    break;
                }

                lockedKeys.add(key);

                GetShowResponse showCached = distributedCacheService.getObject(getShowSeatKey(request.getShowId()), GetShowResponse.class);
                showCached.getSeats().forEach(seatCache -> {
                    if(seat.equals(seatCache.getShowSeatId()) && seatCache.getSeatState() == SeatStateEnum.HELD) {
                        failedToHold.add(seat);
                        throw new BadRequestException(ErrorCode.SEAT_IS_HELD);
                    }
                });
                heldSuccessfully.add(seat);
            }

            if (!failedToHold.isEmpty()) {
                throw new BadRequestException(ErrorCode.SEAT_IS_HELD);
            }


            // Send event to kafka
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
                    .failedToHold(failedToHold)
                    .heldSuccessfully(heldSuccessfully)
                    .build();
        } catch (BadRequestException e) {
            for (String lockedKey : lockedKeys) {
                DistributedLocker locker = distributedLockService.getDistributedLock(lockedKey);
                if (locker.isHeldByCurrentThread()) {
                    locker.unlock();
                }
            }
            throw e;
        } catch (Exception e) {
            for (String lockedKey : lockedKeys) {
                DistributedLocker locker = distributedLockService.getDistributedLock(lockedKey);
                if (locker.isHeldByCurrentThread()) {
                    locker.unlock();
                }
            }
            log.error(e.getMessage());
            throw new RuntimeException("Error while selecting seats", e);
        }
    }

    private String getHoldSeatBookingKey(int showSeatId) {
        return "BOOKING:HOLD:SEAT:" + showSeatId;
    }

    private String getShowSeatKey(int showId) {
        return "show:" + showId;
    }
}
