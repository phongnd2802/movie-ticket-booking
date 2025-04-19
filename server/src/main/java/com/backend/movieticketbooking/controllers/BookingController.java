package com.backend.movieticketbooking.controllers;


import com.backend.movieticketbooking.common.ApiResponse;
import com.backend.movieticketbooking.dtos.booking.request.SelectSeatsRequest;
import com.backend.movieticketbooking.dtos.booking.response.SelectSeatsResponse;
import com.backend.movieticketbooking.security.jwt.JwtProvider;
import com.backend.movieticketbooking.services.booking.BookingService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/booking")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @Autowired
    private JwtProvider jwtProvider;

    @PostMapping("")
    @PreAuthorize("hasAuthority('CUSTOMER')")
    public ApiResponse<SelectSeatsResponse> selectSeats(@RequestBody SelectSeatsRequest request, HttpServletRequest req) {
        String authorizationHeader = req.getHeader("Authorization");
        String token = authorizationHeader.substring(7);
        String userEmail = jwtProvider.getEmailFromToken(token);
        return ApiResponse.success(bookingService.selectSeats(request, userEmail));
    }
}
