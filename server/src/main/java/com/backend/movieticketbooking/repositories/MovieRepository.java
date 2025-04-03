package com.backend.movieticketbooking.repositories;

import com.backend.movieticketbooking.entities.movies.MovieEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieRepository extends JpaRepository<MovieEntity, Integer> {
}
