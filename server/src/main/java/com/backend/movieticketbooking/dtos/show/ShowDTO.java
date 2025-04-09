package com.backend.movieticketbooking.dtos.show;


import com.backend.movieticketbooking.dtos.cinema.CinemaHallDTO;
import lombok.Builder;
import lombok.Data;


@Data
@Builder
public class ShowDTO {
    private int showId;
    private String showStartTime;
    private String showEndTime;

    private CinemaHallDTO cinemaHall;
}
