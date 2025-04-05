package com.backend.movieticketbooking.services.movie.impl;


import com.backend.movieticketbooking.common.ErrorCode;
import com.backend.movieticketbooking.dtos.movie.MovieDTO;
import com.backend.movieticketbooking.dtos.movie.request.CreateMovieRequest;
import com.backend.movieticketbooking.entities.movies.MovieEntity;
import com.backend.movieticketbooking.exceptions.BadRequestException;
import com.backend.movieticketbooking.exceptions.InternalServerException;
import com.backend.movieticketbooking.mapper.MovieMapper;
import com.backend.movieticketbooking.repositories.MovieRepository;
import com.backend.movieticketbooking.services.cache.distributed.DistributedCacheService;
import com.backend.movieticketbooking.services.lock.DistributedLockService;
import com.backend.movieticketbooking.services.lock.DistributedLocker;
import com.backend.movieticketbooking.services.movie.MovieService;
import com.backend.movieticketbooking.services.storage.StorageService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class MovieServiceImpl implements MovieService {

    StorageService storageService;

    MovieRepository movieRepository;

    MovieMapper movieMapper;

    DistributedCacheService distributedCacheService;

    DistributedLockService distributedLockService;

    static String MOVIE_BUCKET = "movies";

    @Override
    @Transactional
    public MovieDTO createMovie(CreateMovieRequest request) {
        String objectUri;
        try (InputStream inputStream = request.getMovieThumbnail().getInputStream()) {
            objectUri = storageService.uploadFile(MOVIE_BUCKET, request.getMovieThumbnail().getOriginalFilename(), inputStream, "image/*");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        MovieEntity movie = MovieEntity.builder()
                .movieAge(request.getMovieAge())
                .movieCountry(request.getMovieCountry())
                .movieName(request.getMovieName())
                .movieDescription(request.getMovieDescription())
                .movieDirector(request.getMovieDirector())
                .movieDuration(request.getMovieDuration())
                .movieRating(BigDecimal.ZERO)
                .movieThumbnail(objectUri)
                .movieProducer(request.getMovieProducer())
                .movieTrailer(request.getMovieTrailer())
                .movieProducer(request.getMovieProducer())
                .movieVoteCount(0)
                .movieLanguage(request.getMovieLanguage())
                .movieReleaseDate(LocalDate.parse(request.getMovieReleaseDate()))
                .build();


        movieRepository.save(movie);

        return movieMapper.toMovieDTO(movie);
    }

    @Override
    public MovieDTO getMovieById(int movieId) {

        // 1. Lấy thông tin phim từ distributed cache
        MovieEntity movieCached = distributedCacheService.getObject(getMovieKey(movieId), MovieEntity.class);
        if (movieCached != null) {
            if (movieCached.getMovieId() == -1) {
                // Khi trong database trước đó không có, thì khi đọc distributed cache  qua movieId này sẽ nhận được là -1
                log.info("GET MOVIE ID {} NOT FOUND FROM DISTRIBUTED CACHE", movieId);
                throw new BadRequestException(ErrorCode.MOVIE_NOT_FOUND);
            }
            // Nếu có, quá ngon
            log.info("GET MOVIE ID {} FROM DISTRIBUTED CACHE", movieId);
            return movieMapper.toMovieDTO(movieCached);
        }

        // Nếu không có trong distributed cache , cho 1 request vào database, các thằng còn lại đứng chờ
        DistributedLocker locker = distributedLockService.getDistributedLock("LOCK_KEY_MOVIE:" + movieId);
        try {
            // Lấy lock
            // waitTime: 1s -> Khoảng thời gian chờ để luồng hiện tại lấy được lock
            // leaseTime: 5s -> Khoảng thời gian tối đa mà luồng hiện tại cầm lock, sau khoảng thời gian này
            // dù luồng hiện tại có thành công hay thất bại đều phải trả lock
            boolean isLock = locker.tryLock(1, 5, TimeUnit.SECONDS);
            if (!isLock) {
                throw new InternalServerException(ErrorCode.INTERNAL_SERVER_ERROR);
            }

            // Đọc lại distributed cache
            movieCached = distributedCacheService.getObject(getMovieKey(movieId), MovieEntity.class);
            if (movieCached != null) {
                return movieMapper.toMovieDTO(movieCached);
            }

            // Tìm trong database
            Optional<MovieEntity> movie = movieRepository.findById(movieId);
            if (movie.isEmpty()) {
                // Nếu database không có, set set lại vào cache với time là 5s, tránh request bẩn
                log.info("GET MOVIE ID {} NOT FOUND FROM DATABASE", movieId);
                distributedCacheService.setObjectTTL(getMovieKey(movieId), movieEmpty(), 5L, TimeUnit.SECONDS);
                throw new BadRequestException(ErrorCode.MOVIE_NOT_FOUND);
            }

            // Set vào distributed cache
            log.info("GET MOVIE ID {} FROM DATABASE", movieId);
            MovieEntity movieEntity = movie.get();
            distributedCacheService.setObjectTTL(getMovieKey(movieEntity.getMovieId()), movieEntity, 60L, TimeUnit.SECONDS);
            return movieMapper.toMovieDTO(movieEntity);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }finally {
            // Dù thành công hay thất bai đều phải trả lock!!
            locker.unlock();
        }
    }

    private String getMovieKey(int movieId) {
        return "movie:" + movieId;
    }

    private MovieEntity movieEmpty() {
        return MovieEntity.builder()
                .movieId(-1)
                .build();
    }
}
