package com.backend.movieticketbooking.services.booking.event;


import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class SeatHeldEvent {
    String bookingId;
    int showId;
    String userEmail;
    List<Integer> heldSeats;
}
