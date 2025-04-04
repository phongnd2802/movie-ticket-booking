package com.backend.movieticketbooking.mapper;


import com.backend.movieticketbooking.dtos.movie.GenreDTO;
import com.backend.movieticketbooking.entities.movies.GenreEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface GenreMapper {
    GenreDTO toGenreDTO(GenreEntity genreEntity);
}
