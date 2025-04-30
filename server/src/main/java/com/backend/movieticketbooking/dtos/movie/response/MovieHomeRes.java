package com.backend.movieticketbooking.dtos.movie.response;


import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class MovieHomeRes {
    private int movieId;

    private String movieName;

    private int movieAge;

    private String movieThumbnail;

    private String movieTrailer;

    private BigDecimal movieRating;
}
