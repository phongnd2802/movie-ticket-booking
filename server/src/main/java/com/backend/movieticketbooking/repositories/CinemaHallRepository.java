package com.backend.movieticketbooking.repositories;

import com.backend.movieticketbooking.entities.cinema.CinemaEntity;
import com.backend.movieticketbooking.entities.cinema.CinemaHallEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CinemaHallRepository extends JpaRepository<CinemaHallEntity, Integer> {
    List<CinemaHallEntity> findByCinema(CinemaEntity cinema);
}
