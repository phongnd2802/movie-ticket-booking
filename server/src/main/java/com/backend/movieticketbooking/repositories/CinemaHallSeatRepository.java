package com.backend.movieticketbooking.repositories;

import com.backend.movieticketbooking.entities.cinema.CinemaHallSeatEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CinemaHallSeatRepository extends JpaRepository<CinemaHallSeatEntity, Integer> {
}
