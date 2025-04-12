package com.backend.movieticketbooking.controllers;


import com.backend.movieticketbooking.common.ApiResponse;
import com.backend.movieticketbooking.dtos.show.request.CreateShowRequest;
import com.backend.movieticketbooking.dtos.show.response.CreateShowResponse;
import com.backend.movieticketbooking.services.show.ShowService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/show")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ShowController {
    ShowService showService;


    @PostMapping("")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ApiResponse<CreateShowResponse> createShow(@RequestBody CreateShowRequest request) {
        CreateShowResponse result = showService.createShow(request);
        return ApiResponse.success(result);
    }
}
