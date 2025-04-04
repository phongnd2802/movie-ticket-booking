package com.backend.movieticketbooking.dtos.movie;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ActorDTO {
    private int actorId;

    private String actorName;

    private String actorImage;

    private LocalDate actorBirthDate;

}
