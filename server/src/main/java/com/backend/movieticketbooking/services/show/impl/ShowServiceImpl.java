package com.backend.movieticketbooking.services.show.impl;

import com.backend.movieticketbooking.common.ErrorCode;
import com.backend.movieticketbooking.dtos.show.ShowSeatDTO;
import com.backend.movieticketbooking.dtos.show.request.CreateShowRequest;
import com.backend.movieticketbooking.dtos.show.response.CreateShowResponse;
import com.backend.movieticketbooking.dtos.show.response.GetShowResponse;
import com.backend.movieticketbooking.dtos.show.response.MovieGetShowResponse;
import com.backend.movieticketbooking.entities.cinema.CinemaHallEntity;
import com.backend.movieticketbooking.entities.movies.MovieEntity;
import com.backend.movieticketbooking.entities.show.ShowEntity;
import com.backend.movieticketbooking.entities.show.ShowSeatEntity;
import com.backend.movieticketbooking.enums.SeatStateEnum;
import com.backend.movieticketbooking.enums.SeatTypeEnum;
import com.backend.movieticketbooking.exceptions.BadRequestException;
import com.backend.movieticketbooking.exceptions.NotFoundException;
import com.backend.movieticketbooking.mapper.CinemaHallSeatMapper;
import com.backend.movieticketbooking.mapper.ShowMapper;
import com.backend.movieticketbooking.repositories.CinemaHallRepository;
import com.backend.movieticketbooking.repositories.MovieRepository;
import com.backend.movieticketbooking.repositories.ShowRepository;
import com.backend.movieticketbooking.repositories.ShowSeatRepository;
import com.backend.movieticketbooking.services.cache.distributed.DistributedCacheService;
import com.backend.movieticketbooking.services.cache.local.LocalCacheService;
import com.backend.movieticketbooking.services.movie.cache.models.MovieCache;
import com.backend.movieticketbooking.services.show.ShowService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;


@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ShowServiceImpl implements ShowService {

    MovieRepository movieRepository;

    CinemaHallRepository cinemaHallRepository;

    ShowRepository showRepository;

    ShowSeatRepository showSeatRepository;

    ShowMapper showMapper;

    DistributedCacheService distributedCacheService;

    CinemaHallSeatMapper cinemaHallSeatMapper;

    LocalCacheService<String, MovieCache> movieLocalCache;

    @Override
    @Transactional
    public CreateShowResponse createShow(CreateShowRequest request) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm");
        try {
            LocalDateTime startTime = LocalDateTime.parse(request.getShowStartTime(), formatter);
            if (startTime.isBefore(LocalDateTime.now())) {
                throw new BadRequestException(ErrorCode.INVALID_FORMAT_TIME);
            }

            Optional<MovieEntity> movieEntity = movieRepository.findById(request.getMovieId());
            if (movieEntity.isEmpty()) {
                throw new NotFoundException(ErrorCode.MOVIE_NOT_FOUND);
            }

            Optional<CinemaHallEntity> cinemaHallEntity = cinemaHallRepository.findById(request.getCinemaHallId());
            if (cinemaHallEntity.isEmpty()) {
                throw new NotFoundException(ErrorCode.CINEMA_HALL_NOT_FOUND);
            }

            MovieEntity movie = movieEntity.get();
            CinemaHallEntity cinemaHall = cinemaHallEntity.get();
            LocalDateTime endTime = startTime.plusMinutes(movie.getMovieDuration());

            if (!isTimeSlotAvailable(cinemaHall.getCinemaHallId(), startTime, endTime)) {
                throw new BadRequestException(ErrorCode.SHOW_ALREADY_EXISTS);
            }

            ShowEntity showEntity = ShowEntity.builder()
                    .showStartTime(startTime)
                    .showEndTime(endTime)
                    .cinemaSeatsNumberAvailable(cinemaHall.getCinemaHallSeats().size())
                    .cinemaHall(cinemaHall)
                    .movie(movie)
                    .build();

            showRepository.save(showEntity);

            List<ShowSeatEntity> showSeatEntities = new ArrayList<>();

            int standardSeatPrice = request.getSeatPrices().get(SeatTypeEnum.STANDARD);
            int coupleSeatPrice = request.getSeatPrices().get(SeatTypeEnum.COUPLE);
            cinemaHall.getCinemaHallSeats().forEach(seatEntity -> {
                ShowSeatEntity showSeatEntity = ShowSeatEntity.builder()
                        .show(showEntity)
                        .cinemaHallSeat(seatEntity)
                        .seatState(SeatStateEnum.AVAILABLE)
                        .build();
                SeatTypeEnum seatType = seatEntity.getSeatType();
                if (seatType.equals(SeatTypeEnum.STANDARD)) {
                    showSeatEntity.setSeatPrice(standardSeatPrice);
                } else if(seatType.equals(SeatTypeEnum.COUPLE)) {
                    showSeatEntity.setSeatPrice(coupleSeatPrice);
                }

                showSeatEntities.add(showSeatEntity);
            });


            showSeatRepository.saveAll(showSeatEntities);

            return showMapper.toCreateShowResponse(showEntity);
        } catch (DateTimeParseException e) {
            throw new BadRequestException(ErrorCode.INVALID_FORMAT_TIME);
        }
    }

    @Override
    public GetShowResponse getShowSeats(int showId) {
        GetShowResponse showCached = distributedCacheService.getObject(getShowSeatKey(showId), GetShowResponse.class);
        if (showCached != null) {
            log.info("GET SHOW {} FROM DISTRIBUTED CACHE", showCached.getShowId());
            return showCached;
        }
        Optional<ShowEntity> showEntity = showRepository.findById(showId);
        if (showEntity.isEmpty()) {
            throw new NotFoundException(ErrorCode.SHOW_NOT_FOUND);
        }
        ShowEntity currentShow = showEntity.get();
        if (currentShow.getShowStartTime().isBefore(LocalDateTime.now())) {
            throw new BadRequestException(ErrorCode.SHOW_IS_PLAYING_OR_IS_FINISHED);
        }

        MovieEntity movie = currentShow.getMovie();
        int movieId = movie.getMovieId();
        int cinemaId = currentShow.getCinemaHall().getCinema().getCinemaId();
        LocalDate showDate = currentShow.getShowStartTime().toLocalDate();
        List<ShowEntity> otherShows = showRepository.findUpcomingSameDaySameCinemaShows(
                movieId,
                showId,
                cinemaId,
                showDate
        );

        log.info("GET SHOW {} FROM DATABASE", showId);
        GetShowResponse res = GetShowResponse.builder()
                .movie(buildMovieGetShowResponse(movie))
                .cinemaHallName(currentShow.getCinemaHall().getCinemaHallName())
                .cinemaName(currentShow.getCinemaHall().getCinema().getCinemaName())
                .showId(currentShow.getShowId())
                .showStartTime(currentShow.getShowStartTime().toString())
                .otherShows(showMapper.toShowDTOs(otherShows))
                .seats(buildShowSeatDTOs(currentShow.getShowSeats()))
                .build();

        distributedCacheService.setObjectTTL(getShowSeatKey(showId), res, 5L, TimeUnit.MINUTES);
        return res;
    }

    private String getShowSeatKey(int showId) {
        return "show:" + showId;
    }

    private List<ShowSeatDTO> buildShowSeatDTOs(List<ShowSeatEntity> showSeatEntities) {
        List<ShowSeatDTO> showSeatDTOs = new ArrayList<>();
        showSeatEntities.forEach(seatEntity -> {
            ShowSeatDTO showSeat = ShowSeatDTO.builder()
                    .showSeatId(seatEntity.getShowSeatId())
                    .showSeatPrice(seatEntity.getSeatPrice())
                    .seatState(seatEntity.getSeatState())
                    .cinemaHallSeat(cinemaHallSeatMapper.toCinemaHallSeatDTO(seatEntity.getCinemaHallSeat()))
                    .build();

            showSeatDTOs.add(showSeat);
        });

        return showSeatDTOs;
    }

    private MovieGetShowResponse buildMovieGetShowResponse(MovieEntity movieEntity) {
        return MovieGetShowResponse.builder()
                .movieId(movieEntity.getMovieId())
                .movieAge(movieEntity.getMovieAge())
                .movieName(movieEntity.getMovieName())
                .movieThumbnail(movieEntity.getMovieThumbnail())
                .build();
    }

    private boolean isTimeSlotAvailable(int cinemaHallId, LocalDateTime startTime, LocalDateTime endTime) {
        List<ShowEntity> existingShows = showRepository.findShowsByCinemaHallIdAndTimeSlot(
                cinemaHallId, startTime, endTime);
        return existingShows.isEmpty();
    }
}
