package com.backend.movieticketbooking.dtos.show;


import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ShowDTO {
    private int showId;
    private LocalDateTime showStartTime;
    private LocalDateTime showEndTime;
}
