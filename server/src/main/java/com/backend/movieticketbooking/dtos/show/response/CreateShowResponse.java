package com.backend.movieticketbooking.dtos.show.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class CreateShowResponse {
    private int showId;
    private int cinemaSeatsNumberAvailable;
    private String showStartTime;
    private String showEndTime;
}
