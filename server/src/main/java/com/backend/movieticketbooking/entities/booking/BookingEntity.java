package com.backend.movieticketbooking.entities.booking;

import com.backend.movieticketbooking.entities.BaseEntity;
import com.backend.movieticketbooking.enums.BookingStateEnum;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BookingEntity extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String bookingId;

    BigDecimal bookingTotalPrice;

    BookingStateEnum bookingState;

    int bookingNumberOfSeats;
}
