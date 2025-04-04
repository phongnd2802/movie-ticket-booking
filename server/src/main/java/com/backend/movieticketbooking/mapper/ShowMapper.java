package com.backend.movieticketbooking.mapper;


import com.backend.movieticketbooking.dtos.show.ShowDTO;
import com.backend.movieticketbooking.entities.show.ShowEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ShowMapper {
    ShowDTO toShowDTO(ShowEntity show);
}
