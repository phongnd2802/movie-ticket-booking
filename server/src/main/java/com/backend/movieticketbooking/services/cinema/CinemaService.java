package com.backend.movieticketbooking.services.cinema;

import com.backend.movieticketbooking.dtos.cinema.CinemaDTO;
import com.backend.movieticketbooking.dtos.cinema.request.CreateCinemaHallRequest;
import com.backend.movieticketbooking.dtos.cinema.response.CreateCinemaHallResponse;
import com.backend.movieticketbooking.dtos.cinema.response.GetCinemaHallResponse;

import java.util.List;

public interface CinemaService {
    CinemaDTO createCinema(CinemaDTO request);
    CreateCinemaHallResponse createHall(CreateCinemaHallRequest request);
    List<GetCinemaHallResponse> getHallsByCinemaId(Integer cinemaId);
    List<CinemaDTO> getAllCinemas();
}
