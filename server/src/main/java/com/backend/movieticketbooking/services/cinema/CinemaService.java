package com.backend.movieticketbooking.services.cinema;

import com.backend.movieticketbooking.dtos.cinema.CinemaDTO;
import com.backend.movieticketbooking.dtos.cinema.CinemaHallDTO;
import com.backend.movieticketbooking.dtos.cinema.request.CreateCinemaHallRequest;
import com.backend.movieticketbooking.entities.cinema.CinemaHallEntity;

public interface CinemaService {
    CinemaDTO createCinema(CinemaDTO request);
    CinemaHallDTO createHall(CreateCinemaHallRequest request);
}
