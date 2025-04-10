package com.backend.movieticketbooking.controllers.admin;


import com.backend.movieticketbooking.common.ApiResponse;
import com.backend.movieticketbooking.dtos.cinema.CinemaDTO;
import com.backend.movieticketbooking.dtos.cinema.request.CreateCinemaHallRequest;
import com.backend.movieticketbooking.dtos.cinema.response.CreateCinemaHallResponse;
import com.backend.movieticketbooking.services.cinema.CinemaService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/cinema")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CinemaController {

    CinemaService cinemaService;

    @PostMapping("")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ApiResponse<CinemaDTO> addCinema(@RequestBody CinemaDTO request) {
        CinemaDTO result = cinemaService.createCinema(request);

        return ApiResponse.success(result);
    }

    @PostMapping("/hall")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ApiResponse<CreateCinemaHallResponse> addCinemaHall(@RequestBody CreateCinemaHallRequest request) {
        return ApiResponse.success(cinemaService.createHall(request));
    }
}
