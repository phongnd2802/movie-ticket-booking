package com.backend.movieticketbooking.services.movie;

import com.backend.movieticketbooking.dtos.movie.GenreDTO;

public interface GenreService {
    GenreDTO addGenre(String genreName);
}
