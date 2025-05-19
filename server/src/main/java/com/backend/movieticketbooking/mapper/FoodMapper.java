package com.backend.movieticketbooking.mapper;


import com.backend.movieticketbooking.dtos.food.FoodDTO;
import com.backend.movieticketbooking.entities.other.FoodEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface FoodMapper {
    @Mapping(target = "foodThumbnailUrl", source = "foodThumbnail")
    @Mapping(target = "foodThumbnail", ignore = true) // không map MultipartFile
    FoodDTO toFoodDTO(FoodEntity foodEntity);
}
