package com.backend.movieticketbooking.entities.cinema;

import com.backend.movieticketbooking.entities.BaseEntity;
import com.backend.movieticketbooking.entities.show.ShowSeatEntity;
import com.backend.movieticketbooking.enums.SeatTypeEnum;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class CinemaHallSeatEntity extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "seat_id")
    int seatId;

    String seatRow;

    String seatCol;

    SeatTypeEnum seatType;

    @OneToMany(mappedBy = "cinemaHallSeat", fetch = FetchType.LAZY)
    List<ShowSeatEntity> showSeats;
}
