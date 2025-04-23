package com.backend.movieticketbooking.dtos.booking.request;


import lombok.Data;

import java.util.List;

@Data
public class SelectSeatsRequest {
    private List<Integer> seats;
    private int showId;
}
