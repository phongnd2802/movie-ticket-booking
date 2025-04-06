package com.backend.movieticketbooking.dtos.cinema.request;


import com.backend.movieticketbooking.enums.SeatTypeEnum;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Builder;
import lombok.Data;

import java.util.Map;

@Data
@Builder
public class CreateCinemaHallRequest {

    @Positive(message = "cinemaId must be positive")
    private int cinemaId;

    @NotBlank(message = "cinemaHallName is required")
    private String cinemaHallName;

    @NotNull(message = "seats are required")
    @NotEmpty(message = "seats map cannot be empty")
    private Map<SeatTypeEnum, Integer> seats;
}
