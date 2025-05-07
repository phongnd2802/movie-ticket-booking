package com.backend.movieticketbooking.dtos.booking;

import com.backend.movieticketbooking.dtos.show.ShowDTO;
import com.backend.movieticketbooking.dtos.show.ShowSeatDTO;
import com.backend.movieticketbooking.enums.BookingStateEnum;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BookingDTO {
    String bookingId;

    BigDecimal bookingTotalPrice;

    BookingStateEnum bookingState;

    int bookingNumberOfSeats;

    List<ShowSeatDTO> showSeats;
}
