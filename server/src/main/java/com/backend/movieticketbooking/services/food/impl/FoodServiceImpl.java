package com.backend.movieticketbooking.services.food.impl;

import com.backend.movieticketbooking.dtos.food.FoodDTO;
import com.backend.movieticketbooking.entities.other.FoodEntity;
import com.backend.movieticketbooking.mapper.FoodMapper;
import com.backend.movieticketbooking.repositories.FoodRepository;
import com.backend.movieticketbooking.services.food.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FoodServiceImpl implements FoodService {

    @Autowired
    private FoodRepository foodRepository;

    @Autowired
    private FoodMapper foodMapper;

    @Override
    public FoodDTO createFood(FoodDTO createFood) {
        FoodEntity foodEntity = FoodEntity.builder()
                .foodName(createFood.getFoodName())
                .foodPrice(createFood.getFoodPrice())
                .foodDescription(createFood.getFoodDescription())
                .build();

        foodRepository.save(foodEntity);
        return foodMapper.toFoodDTO(foodEntity);
    }

    @Override
    public List<FoodDTO> getAllFoods() {
        List<FoodEntity> foods = foodRepository.findAll();

        return foods.stream().map(foodMapper::toFoodDTO).collect(Collectors.toList());
    }
}
