package com.backend.movieticketbooking.services.show;

import com.backend.movieticketbooking.dtos.show.CreateShowRequest;
import com.backend.movieticketbooking.dtos.show.ShowDTO;

public interface ShowService {
    ShowDTO createShow(CreateShowRequest request);
}
