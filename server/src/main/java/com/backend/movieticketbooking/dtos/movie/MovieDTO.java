package com.backend.movieticketbooking.dtos.movie;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MovieDTO {
    private int movieId;

    private String movieName;

    private String movieDescription;

    private int movieAge;

    private String movieThumbnail;

    private String movieTrailer;

    private BigDecimal movieRating;

    private int movieDuration; // minute

    private String movieLanguage;

    private String movieCountry;

    private String movieReleaseDate;

    private String movieDirector;

    private String movieProducer;
}
