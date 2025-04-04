package com.backend.movieticketbooking.mapper;


import com.backend.movieticketbooking.dtos.cinema.CinemaHallSeatDTO;
import com.backend.movieticketbooking.entities.cinema.CinemaHallSeatEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CinemaHallSeatMapper {
    @Mapping(target = "seatName", expression = "java(seat.getSeatRow() + seat.getSeatCol())")
    CinemaHallSeatDTO toCinemaHallSeatDTO(CinemaHallSeatEntity seat);

    List<CinemaHallSeatDTO> toCinemaHallSeatDTO(List<CinemaHallSeatEntity> cinemaHallSeatEntities);


}
