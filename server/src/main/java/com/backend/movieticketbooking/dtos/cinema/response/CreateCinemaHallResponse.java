package com.backend.movieticketbooking.dtos.cinema.response;


import lombok.Data;

@Data
public class CreateCinemaHallResponse {
    private int cinemaId;
    private int cinemaHallId;
    private String cinemaHallName;
    private int cinemaSeatsNumberAvailable;


}
