package com.backend.movieticketbooking.dtos.cinema;


import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class CinemaHallDTO {
    private int cinemaId;
    private int cinemaHallId;
    private String cinemaHallName;
    private int cinemaSeatsNumberAvailable;

    private List<CinemaHallSeatDTO> cinemaHallSeats;
}
