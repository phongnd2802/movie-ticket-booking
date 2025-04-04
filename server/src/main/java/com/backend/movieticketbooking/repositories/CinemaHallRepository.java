package com.backend.movieticketbooking.repositories;

import com.backend.movieticketbooking.entities.cinema.CinemaHallEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CinemaHallRepository extends JpaRepository<CinemaHallEntity, Integer> {
}
