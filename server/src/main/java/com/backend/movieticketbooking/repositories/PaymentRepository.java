package com.backend.movieticketbooking.repositories;

import com.backend.movieticketbooking.entities.booking.PaymentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<PaymentEntity, String> {
}
