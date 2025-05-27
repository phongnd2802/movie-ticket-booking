package com.backend.movieticketbooking.repositories;

import com.backend.movieticketbooking.entities.other.FoodEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FoodRepository extends JpaRepository<FoodEntity, Integer> {
    List<FoodEntity> findByFoodIdIn(List<Integer> ids);
}
