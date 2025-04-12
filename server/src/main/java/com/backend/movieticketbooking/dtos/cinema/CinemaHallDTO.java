package com.backend.movieticketbooking.dtos.cinema;


import lombok.Builder;
import lombok.Data;


@Data
@Builder
public class CinemaHallDTO {
    private int cinemaHallId;
    private String cinemaHallName;

    private CinemaDTO cinema;
}
