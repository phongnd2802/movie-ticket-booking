package com.backend.movieticketbooking.mapper;


import com.backend.movieticketbooking.dtos.movie.MovieDTO;
import com.backend.movieticketbooking.dtos.movie.response.MovieHomeRes;
import com.backend.movieticketbooking.entities.movies.MovieEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MovieMapper {
    MovieDTO toMovieDTO(MovieEntity movieEntity);
    MovieHomeRes toMovieHomeRes(MovieEntity movieEntity);
}
