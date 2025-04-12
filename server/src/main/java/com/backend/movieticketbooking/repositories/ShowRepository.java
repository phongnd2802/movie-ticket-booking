package com.backend.movieticketbooking.repositories;

import com.backend.movieticketbooking.entities.show.ShowEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface ShowRepository extends JpaRepository<ShowEntity, Integer> {
    @Query("SELECT s FROM ShowEntity s WHERE s.cinemaHall.cinemaHallId = :cinemaHallId " +
            "AND ((s.showStartTime BETWEEN :startTime AND :endTime) " +
            "OR (s.showEndTime BETWEEN :startTime AND :endTime))")
    List<ShowEntity> findShowsByCinemaHallIdAndTimeSlot(@Param("cinemaHallId") int cinemaHallId,
                                                        @Param("startTime") LocalDateTime startTime,
                                                        @Param("endTime") LocalDateTime endTime);

    List<ShowEntity> findByMovie_MovieIdAndShowIdNot(int movieId, int showId);

    @Query("SELECT s FROM ShowEntity s " +
            "WHERE s.movie.movieId = :movieId " +
            "AND s.showId <> :showId " +
            "AND s.showStartTime > CURRENT_TIMESTAMP")
    List<ShowEntity> findUpcomingShowsByMovieIdExcludingShowId(@Param("movieId") int movieId,
                                                               @Param("showId") int showId);

    @Query("""
                SELECT s FROM ShowEntity s
                WHERE s.movie.movieId = :movieId
                  AND s.showId <> :showId
                  AND s.cinemaHall.cinema.cinemaId = :cinemaId
                  AND DATE(s.showStartTime) = DATE(:targetDate)
                  AND s.showStartTime > CURRENT_TIMESTAMP
            """)
    List<ShowEntity> findUpcomingSameDaySameCinemaShows(
            @Param("movieId") int movieId,
            @Param("showId") int showId,
            @Param("cinemaId") int cinemaId,
            @Param("targetDate") LocalDate targetDate
    );
}
