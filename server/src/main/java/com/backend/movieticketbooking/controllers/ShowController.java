package com.backend.movieticketbooking.controllers;


import com.backend.movieticketbooking.common.ApiResponse;
import com.backend.movieticketbooking.dtos.show.response.GetShowResponse;
import com.backend.movieticketbooking.services.show.ShowService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/show")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ShowController {
    ShowService showService;

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('CUSTOMER')")
    public ApiResponse<GetShowResponse> getShowSeatsById(@PathVariable Integer id) {
        GetShowResponse result = showService.getShowSeats(id);
        return ApiResponse.success(result);
    }
}
