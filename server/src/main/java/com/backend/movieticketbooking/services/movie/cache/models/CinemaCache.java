package com.backend.movieticketbooking.services.movie.cache.models;

import com.backend.movieticketbooking.entities.cinema.CinemaEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CinemaCache {
    int cinemaId;
    String cinemaName;
    String cinemaStreet;
    String cinemaProvince;
    String cinemaDistrict;
    String cinemaWard;

    public static CinemaCache toCinemaCache(CinemaEntity cinemaEntity) {
        return CinemaCache.builder()
                .cinemaId(cinemaEntity.getCinemaId())
                .cinemaName(cinemaEntity.getCinemaName())
                .cinemaStreet(cinemaEntity.getCinemaStreet())
                .cinemaProvince(cinemaEntity.getAddress().getProvince())
                .cinemaDistrict(cinemaEntity.getAddress().getDistrict())
                .cinemaWard(cinemaEntity.getAddress().getWard())
                .build();
    }
}
