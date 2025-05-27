package com.backend.movieticketbooking.repositories;

import com.backend.movieticketbooking.entities.movies.MovieEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MovieRepository extends JpaRepository<MovieEntity, Integer> {
    Page<MovieEntity> findAllByOrderByMovieReleaseDateDesc(Pageable pageable);
    Page<MovieEntity> findByMovieNameContainingIgnoreCase(String title, Pageable pageable);
}
