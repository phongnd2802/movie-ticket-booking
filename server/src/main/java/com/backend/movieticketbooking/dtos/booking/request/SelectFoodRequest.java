package com.backend.movieticketbooking.dtos.booking.request;

import lombok.Builder;
import lombok.Data;

import java.util.Map;

@Data
@Builder
public class SelectFoodRequest {
    private String bookingId;
    private Map<Integer, Integer> foods;
}
