package com.backend.movieticketbooking.services.movie;

import com.backend.movieticketbooking.dtos.movie.ActorDTO;
import com.backend.movieticketbooking.dtos.movie.request.CreateActorRequest;

public interface ActorService {
    ActorDTO createActor(CreateActorRequest request);
}
