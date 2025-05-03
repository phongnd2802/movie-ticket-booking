package com.backend.movieticketbooking.repositories;

import com.backend.movieticketbooking.entities.other.FoodEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodRepository extends JpaRepository<FoodEntity, Integer> {
}
