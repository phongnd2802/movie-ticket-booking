package com.backend.movieticketbooking.repositories;

import com.backend.movieticketbooking.entities.movies.GenreEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GenreRepository extends JpaRepository<GenreEntity, Integer> {
    Optional<GenreEntity> findByGenreName(String name);
}
