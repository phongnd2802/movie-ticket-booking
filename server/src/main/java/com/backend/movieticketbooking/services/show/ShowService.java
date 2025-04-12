package com.backend.movieticketbooking.services.show;

import com.backend.movieticketbooking.dtos.show.request.CreateShowRequest;
import com.backend.movieticketbooking.dtos.show.response.CreateShowResponse;

public interface ShowService {
    CreateShowResponse createShow(CreateShowRequest request);
}

