package com.backend.movieticketbooking.mapper;


import com.backend.movieticketbooking.dtos.show.ShowDTO;
import com.backend.movieticketbooking.dtos.show.response.CreateShowResponse;
import com.backend.movieticketbooking.entities.show.ShowEntity;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ShowMapper {
    ShowDTO toShowDTO(ShowEntity show);
    List<ShowDTO> toShowDTOs(List<ShowEntity> shows);
    CreateShowResponse toCreateShowResponse(ShowEntity show);
}
