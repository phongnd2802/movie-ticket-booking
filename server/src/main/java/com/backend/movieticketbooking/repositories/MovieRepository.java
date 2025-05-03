package com.backend.movieticketbooking.repositories;

import com.backend.movieticketbooking.entities.movies.MovieEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MovieRepository extends JpaRepository<MovieEntity, Integer> {

    @Query("select m from MovieEntity m")
   List<MovieEntity> getAllMovies();
}
