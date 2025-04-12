package com.backend.movieticketbooking.controllers;


import com.backend.movieticketbooking.common.ApiResponse;
import com.backend.movieticketbooking.services.movie.MovieService;
import com.backend.movieticketbooking.services.movie.cache.models.MovieCache;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/movie")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class MovieController {
    MovieService movieService;

    @GetMapping("/{id}")
    public ApiResponse<MovieCache> getMovie(@PathVariable Integer id) {
        MovieCache result= movieService.getMovieById(id);
        return ApiResponse.success(result);
    }
}
