package com.backend.movieticketbooking.dtos.cinema.response;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GetCinemaHallResponse {
    private int cinemaHallId;
    private String cinemaHallName;
}
