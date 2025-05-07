package com.backend.movieticketbooking.dtos.food;


import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.springframework.web.multipart.MultipartFile;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FoodDTO {
    int foodId;

    MultipartFile foodThumbnail;

    String foodThumbnailUrl;

    String foodName;

    String foodDescription;

    int foodPrice;
}
