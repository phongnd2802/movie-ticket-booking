package com.backend.movieticketbooking.services.food.impl;

import com.backend.movieticketbooking.dtos.food.FoodDTO;
import com.backend.movieticketbooking.entities.other.FoodEntity;
import com.backend.movieticketbooking.mapper.FoodMapper;
import com.backend.movieticketbooking.repositories.FoodRepository;
import com.backend.movieticketbooking.services.food.FoodService;
import com.backend.movieticketbooking.services.storage.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FoodServiceImpl implements FoodService {

    @Autowired
    private FoodRepository foodRepository;

    @Autowired
    private FoodMapper foodMapper;

    @Autowired
    @Qualifier("cloudinaryStorage")
    private StorageService storageService;

    private final static String FOOD_BUCKET = "foods";

    @Override
    public FoodDTO createFood(FoodDTO createFood) {
        String objectUri;
        try (InputStream inputStream = createFood.getFoodThumbnail().getInputStream()) {
            objectUri = storageService.uploadFile(FOOD_BUCKET, createFood.getFoodThumbnail().getOriginalFilename(), inputStream, "image/*");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        FoodEntity foodEntity = FoodEntity.builder()
                .foodThumbnail(objectUri)
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
