package com.backend.movieticketbooking.dtos.cinema.request;


import com.backend.movieticketbooking.enums.SeatTypeEnum;
import lombok.Builder;
import lombok.Data;

import java.util.Map;

@Data
@Builder
public class CreateCinemaHallRequest {
    private int cinemaId;
    private String cinemaHallName;

    private Map<SeatTypeEnum, Integer> seats;
}
