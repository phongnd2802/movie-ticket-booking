package com.backend.movieticketbooking.entities.show;

import com.backend.movieticketbooking.entities.BaseEntity;
import com.backend.movieticketbooking.entities.booking.BookingEntity;
import com.backend.movieticketbooking.entities.cinema.CinemaHallSeatEntity;
import com.backend.movieticketbooking.enums.SeatStateEnum;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class ShowSeatEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int showSeatId;

    SeatStateEnum seatState;

    int seatPrice;

    @ManyToOne
    @JoinColumn(name = "show_id")
    ShowEntity show;

    @ManyToOne
    @JoinColumn(name = "seat_id")
    CinemaHallSeatEntity cinemaHallSeat;

    @ManyToOne
    @JoinColumn(name = "booking_id")
    BookingEntity booking;
}
