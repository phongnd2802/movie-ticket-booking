package com.backend.movieticketbooking.entities.booking;

import com.backend.movieticketbooking.entities.BaseEntity;
import com.backend.movieticketbooking.enums.PaymentStatusEnum;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class PaymentEntity extends BaseEntity {
    @Id
    String transactionId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id", nullable = false)
    BookingEntity booking;

    BigDecimal amount;

    String paymentMethod;

    PaymentStatusEnum paymentStatus;
}
