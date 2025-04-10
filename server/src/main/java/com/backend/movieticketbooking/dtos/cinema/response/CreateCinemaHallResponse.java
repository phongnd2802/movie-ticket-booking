package com.backend.movieticketbooking.dtos.cinema.response;


import com.backend.movieticketbooking.dtos.cinema.CinemaHallSeatDTO;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class CreateCinemaHallResponse {
    private int cinemaId;
    private int cinemaHallId;
    private String cinemaHallName;

    private List<CinemaHallSeatDTO> cinemaHallSeats;

}
