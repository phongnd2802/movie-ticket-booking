package com.backend.movieticketbooking.controllers.admin;

import com.backend.movieticketbooking.common.ApiResponse;
import com.backend.movieticketbooking.dtos.food.FoodDTO;
import com.backend.movieticketbooking.services.food.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/food")
public class FoodAdminController {
    @Autowired
    private FoodService foodService;

    @PostMapping("")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ApiResponse<FoodDTO> createFood(@RequestBody FoodDTO foodDTO) {
        return ApiResponse.success(foodService.createFood(foodDTO));
    }
}
