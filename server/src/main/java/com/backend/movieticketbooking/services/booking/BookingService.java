package com.backend.movieticketbooking.services.booking;

import com.backend.movieticketbooking.dtos.booking.request.SelectSeatsRequest;
import com.backend.movieticketbooking.dtos.booking.response.SelectSeatsResponse;

import java.util.List;

public interface BookingService {
    SelectSeatsResponse selectSeats(SelectSeatsRequest request, String userEmail);
}
