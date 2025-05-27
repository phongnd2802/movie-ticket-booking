package com.backend.movieticketbooking.services.booking;

import com.backend.movieticketbooking.dtos.booking.request.SelectFoodRequest;
import com.backend.movieticketbooking.dtos.booking.request.SelectSeatsRequest;
import com.backend.movieticketbooking.dtos.booking.response.SelectSeatsResponse;


public interface BookingService {
    SelectSeatsResponse selectSeats(SelectSeatsRequest request, String userEmail);
    boolean selectFood(SelectFoodRequest request);
}
