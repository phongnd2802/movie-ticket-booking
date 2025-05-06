package com.backend.movieticketbooking.mapper;


import com.backend.movieticketbooking.dtos.movie.ActorDTO;
import com.backend.movieticketbooking.entities.movies.ActorEntity;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ActorMapper {
    ActorDTO toActorDTO(ActorEntity actor);
}
