package com.backend.movieticketbooking.services.food;

import com.backend.movieticketbooking.dtos.food.FoodDTO;

import java.util.List;

public interface FoodService {
    FoodDTO createFood(FoodDTO createFood);
    List<FoodDTO> getAllFoods();
}
