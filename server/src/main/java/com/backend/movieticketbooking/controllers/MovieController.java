package com.backend.movieticketbooking.controllers;


import com.backend.movieticketbooking.common.ApiResponse;
import com.backend.movieticketbooking.dtos.movie.response.MovieHome;
import com.backend.movieticketbooking.services.movie.MovieService;
import com.backend.movieticketbooking.services.movie.cache.models.MovieCache;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/home")
    public ApiResponse<MovieHome> getMovieHome(
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(defaultValue = "0") int offset
    ) {
        MovieHome result= movieService.getMovieHome(limit, offset);
        return ApiResponse.success(result);
    }
}
