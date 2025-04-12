package com.backend.movieticketbooking.controllers.admin;


import com.backend.movieticketbooking.common.ApiResponse;
import com.backend.movieticketbooking.dtos.movie.ActorDTO;
import com.backend.movieticketbooking.dtos.movie.GenreDTO;
import com.backend.movieticketbooking.dtos.movie.MovieDTO;
import com.backend.movieticketbooking.dtos.movie.request.CreateActorRequest;
import com.backend.movieticketbooking.dtos.movie.request.CreateGenreRequest;
import com.backend.movieticketbooking.dtos.movie.request.CreateMovieRequest;
import com.backend.movieticketbooking.services.movie.ActorService;
import com.backend.movieticketbooking.services.movie.GenreService;
import com.backend.movieticketbooking.services.movie.MovieService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/movie")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class MovieAdminController {

    GenreService genreService;

    ActorService actorService;

    MovieService movieService;

    @PostMapping("/genre")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ApiResponse<GenreDTO> createGenre(@RequestBody CreateGenreRequest request) {
        GenreDTO genreCreated = genreService.addGenre(request.getGenre());
        return ApiResponse.success(genreCreated);
    }

    @PostMapping("/actor")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ApiResponse<ActorDTO> createActor(@ModelAttribute CreateActorRequest request) {
        ActorDTO result = actorService.createActor(request);
        return ApiResponse.success(result);
    }

    @PostMapping("")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ApiResponse<MovieDTO> createMovie(@ModelAttribute CreateMovieRequest request) {
        MovieDTO result = movieService.createMovie(request);
        return ApiResponse.success(result);
    }

}
