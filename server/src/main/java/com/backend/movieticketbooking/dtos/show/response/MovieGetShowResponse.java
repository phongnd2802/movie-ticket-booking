package com.backend.movieticketbooking.dtos.show.response;


import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MovieGetShowResponse {
    String movieName;
    int movieAge;
    String movieThumbnail;

}
