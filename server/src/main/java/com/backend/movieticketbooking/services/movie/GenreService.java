package com.backend.movieticketbooking.services.movie;

import com.backend.movieticketbooking.dtos.movie.GenreDTO;

import java.util.List;

public interface GenreService {
    GenreDTO addGenre(String genreName);
    List<GenreDTO> getAllGenres();
}
