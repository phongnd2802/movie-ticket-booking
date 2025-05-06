package com.backend.movieticketbooking.services.movie.cache.models;


import com.backend.movieticketbooking.entities.show.ShowEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ShowCache {
    int showId;
    String showStartTime;
    String showEndTime;
    CinemaHallCache cinemaHall;

    public static ShowCache toShowCache(ShowEntity showEntity) {
        return ShowCache.builder()
                .showId(showEntity.getShowId())
                .showStartTime(showEntity.getShowStartTime().toString())
                .showEndTime(showEntity.getShowEndTime().toString())
                .cinemaHall(CinemaHallCache.toCinemaHallCache(showEntity.getCinemaHall()))
                .build();
    }

    public static List<ShowCache> toShowCaches(List<ShowEntity> showEntities) {
        return showEntities.stream().map(ShowCache::toShowCache).collect(Collectors.toList());
    }
}
