package com.backend.movieticketbooking.dtos.show.request;


import com.backend.movieticketbooking.enums.SeatTypeEnum;
import lombok.Builder;
import lombok.Data;

import java.util.Map;

@Data
@Builder
public class CreateShowRequest {
    private int movieId;
    private String showStartTime;
    private int cinemaHallId;
    private Map<SeatTypeEnum, Integer> seatPrices;
}
