package com.backend.movieticketbooking.dtos.food;


import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FoodDTO {
    int foodId;

    String foodName;

    String foodDescription;

    int foodPrice;
}
