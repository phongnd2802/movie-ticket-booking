package com.backend.movieticketbooking.mapper;


import com.backend.movieticketbooking.dtos.food.FoodDTO;
import com.backend.movieticketbooking.entities.other.FoodEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface FoodMapper {
    FoodDTO toFoodDTO(FoodEntity foodEntity);
}
