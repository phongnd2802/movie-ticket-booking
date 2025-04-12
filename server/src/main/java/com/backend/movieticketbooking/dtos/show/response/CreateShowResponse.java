package com.backend.movieticketbooking.dtos.show.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class CreateShowResponse {
    private int showId;
    private LocalDateTime showStartTime;
    private LocalDateTime showEndTime;
}
