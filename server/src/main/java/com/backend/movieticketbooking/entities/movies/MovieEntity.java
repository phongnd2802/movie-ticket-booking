package com.backend.movieticketbooking.entities.movies;

import com.backend.movieticketbooking.entities.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDate;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MovieEntity extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int movieId;

    String movieName;

    String movieDescription;

    int movieAge;

    String movieThumbnail;

    String movieTrailer;

    BigDecimal movieRating;

    int movieVoteCount;

    int movieDuration; // minute

    String movieLanguage;

    String movieCountry;

    LocalDate movieReleaseDate;

    String movieDirector;

    String movieProducer;


}
