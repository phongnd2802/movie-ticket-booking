package com.backend.movieticketbooking.controllers.admin;


import com.backend.movieticketbooking.common.ApiResponse;
import com.backend.movieticketbooking.dtos.movie.GenreDTO;
import com.backend.movieticketbooking.services.movie.GenreService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin/genre")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class GenreController {
    GenreService genreService;

    @GetMapping("")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ApiResponse<List<GenreDTO>> getAllGenres() {
        return ApiResponse.success(genreService.getAllGenres());
    }
}
