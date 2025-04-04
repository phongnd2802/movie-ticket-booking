package com.backend.movieticketbooking.repositories;

import com.backend.movieticketbooking.entities.show.ShowEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface ShowRepository extends JpaRepository<ShowEntity, Integer> {
    @Query("SELECT s FROM ShowEntity s WHERE s.cinemaHall.cinemaHallId = :cinemaHallId " +
            "AND ((s.showStartTime BETWEEN :startTime AND :endTime) " +
            "OR (s.showEndTime BETWEEN :startTime AND :endTime))")
    List<ShowEntity> findShowsByCinemaHallIdAndTimeSlot(@Param("cinemaHallId") int cinemaHallId,
                                                        @Param("startTime") LocalDateTime startTime,
                                                        @Param("endTime") LocalDateTime endTime);
}
