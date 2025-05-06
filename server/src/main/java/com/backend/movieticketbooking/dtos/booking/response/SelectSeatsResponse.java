package com.backend.movieticketbooking.dtos.booking.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;


@Data
@Builder
public class SelectSeatsResponse {
    private String bookingId;
    private List<Integer> heldSuccessfully;
    private List<Integer> failedToHold;
}
