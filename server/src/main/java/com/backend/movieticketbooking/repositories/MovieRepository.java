package com.backend.movieticketbooking.repositories;

import com.backend.movieticketbooking.entities.movies.MovieEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieRepository extends JpaRepository<MovieEntity, Integer> {
    Page<MovieEntity> findAllByOrderByMovieReleaseDateDesc(Pageable pageable);
}
