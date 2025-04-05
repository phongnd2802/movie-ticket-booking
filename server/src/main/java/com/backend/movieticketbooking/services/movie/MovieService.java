package com.backend.movieticketbooking.services.movie;

import com.backend.movieticketbooking.dtos.movie.MovieDTO;
import com.backend.movieticketbooking.dtos.movie.request.CreateMovieRequest;

public interface MovieService {
    MovieDTO createMovie(CreateMovieRequest request);
    MovieDTO getMovieById(int movieId);
}
