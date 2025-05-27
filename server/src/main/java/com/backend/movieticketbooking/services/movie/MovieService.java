package com.backend.movieticketbooking.services.movie;

import com.backend.movieticketbooking.dtos.movie.MovieDTO;
import com.backend.movieticketbooking.dtos.movie.request.CreateMovieRequest;
import com.backend.movieticketbooking.dtos.movie.response.MovieHome;
import com.backend.movieticketbooking.services.movie.cache.models.MovieCache;

import java.util.List;

public interface MovieService {
    MovieDTO createMovie(CreateMovieRequest request);
    MovieCache getMovieById(int movieId);
    MovieHome getMovieHome(int limit, int offset);
    MovieHome searchMovieByTitle(String keyword);
}
