package com.backend.movieticketbooking.controllers;


import com.backend.movieticketbooking.common.ApiResponse;
import com.backend.movieticketbooking.dtos.food.FoodDTO;
import com.backend.movieticketbooking.services.food.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/food")
public class FoodController {

    @Autowired
    private FoodService foodService;

    @GetMapping("")
    @PreAuthorize("hasAuthority('CUSTOMER')")
    public ApiResponse<List<FoodDTO>> getAllFoods() {
        return ApiResponse.success(foodService.getAllFoods());
    }
}
