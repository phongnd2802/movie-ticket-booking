package com.backend.movieticketbooking.dtos.show;

import com.backend.movieticketbooking.dtos.cinema.CinemaHallSeatDTO;
import com.backend.movieticketbooking.enums.SeatStateEnum;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;


@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ShowSeatDTO {
    int showSeatId;

    SeatStateEnum seatState;
    int seatPrice;
    CinemaHallSeatDTO cinemaHallSeat;
}
