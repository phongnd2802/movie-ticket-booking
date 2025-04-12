package com.backend.movieticketbooking.services.movie.cache.models;

import com.backend.movieticketbooking.entities.cinema.CinemaHallEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CinemaHallCache {
    int cinemaHallId;
    String cinemaHallName;
    CinemaCache cinema;

    public static CinemaHallCache toCinemaHallCache(CinemaHallEntity cinemaHallEntity) {
        return CinemaHallCache.builder()
                .cinemaHallId(cinemaHallEntity.getCinemaHallId())
                .cinemaHallName(cinemaHallEntity.getCinemaHallName())
                .cinema(CinemaCache.toCinemaCache(cinemaHallEntity.getCinema()))
                .build();
    }
}
