package com.backend.movieticketbooking.dtos.cinema;

import com.backend.movieticketbooking.enums.SeatTypeEnum;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CinemaHallSeatDTO {
    private int seatId;
    private String seatName;
    private SeatTypeEnum seatType;

}
