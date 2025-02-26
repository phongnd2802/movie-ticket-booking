package com.backend.movieticketbooking.entities.show;

import com.backend.movieticketbooking.entities.BaseEntity;
import com.backend.movieticketbooking.enums.SeatStateEnum;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import lombok.experimental.FieldDefaults;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ShowSeatEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int showSeatId;

    int showSeatNumber;

    SeatStateEnum seatState;

    int seatPrice;
}
