package com.backend.movieticketbooking.controllers;


import com.backend.movieticketbooking.common.ApiResponse;
import com.backend.movieticketbooking.dtos.movie.response.MovieHome;
import com.backend.movieticketbooking.services.movie.MovieService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/search")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SearchController {

    MovieService movieService;

    @GetMapping("")
    public ApiResponse<MovieHome> search(@RequestParam("k") String keyword) {
        if (keyword == null || keyword.isEmpty()) {
            return ApiResponse.success(null);
        }

        System.out.println(keyword);
        return ApiResponse.success(movieService.searchMovieByTitle(keyword));
    }
}

