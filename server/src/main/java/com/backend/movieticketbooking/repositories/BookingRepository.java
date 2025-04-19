package com.backend.movieticketbooking.repositories;

import com.backend.movieticketbooking.entities.booking.BookingEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<BookingEntity, String> {
}
