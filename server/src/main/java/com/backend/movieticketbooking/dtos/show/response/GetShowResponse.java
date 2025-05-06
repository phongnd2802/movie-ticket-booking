package com.backend.movieticketbooking.dtos.show.response;


import com.backend.movieticketbooking.dtos.show.ShowDTO;
import com.backend.movieticketbooking.dtos.show.ShowSeatDTO;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class GetShowResponse {
    MovieGetShowResponse movie;
    int showId;
    String showStartTime;
    String cinemaName;
    String cinemaHallName;
    List<ShowDTO> otherShows;
    List<ShowSeatDTO> seats;
}
