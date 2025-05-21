package com.backend.movieticketbooking.repositories;

import com.backend.movieticketbooking.entities.booking.BookingEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BookingRepository extends JpaRepository<BookingEntity, String> {
    Optional<BookingEntity> findByBookingId(String bookingId);
}
