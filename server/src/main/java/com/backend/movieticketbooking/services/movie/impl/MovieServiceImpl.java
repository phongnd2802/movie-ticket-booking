package com.backend.movieticketbooking.services.movie.impl;


import com.backend.movieticketbooking.common.ErrorCode;
import com.backend.movieticketbooking.dtos.movie.MovieDTO;
import com.backend.movieticketbooking.dtos.movie.request.CreateMovieRequest;
import com.backend.movieticketbooking.dtos.movie.response.MovieHome;
import com.backend.movieticketbooking.entities.movies.MovieEntity;
import com.backend.movieticketbooking.exceptions.BadRequestException;
import com.backend.movieticketbooking.exceptions.InternalServerException;
import com.backend.movieticketbooking.mapper.MovieMapper;
import com.backend.movieticketbooking.repositories.MovieRepository;
import com.backend.movieticketbooking.services.cache.distributed.DistributedCacheService;
import com.backend.movieticketbooking.services.cache.local.LocalCacheService;
import com.backend.movieticketbooking.services.lock.DistributedLockService;
import com.backend.movieticketbooking.services.lock.DistributedLocker;
import com.backend.movieticketbooking.services.movie.MovieService;
import com.backend.movieticketbooking.services.movie.cache.models.MovieCache;
import com.backend.movieticketbooking.services.storage.StorageService;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MovieServiceImpl implements MovieService {

    @Autowired
    @Qualifier("cloudinaryStorage")
    StorageService storageService;

    @Autowired
    MovieRepository movieRepository;

    @Autowired
    MovieMapper movieMapper;

    @Autowired
    DistributedCacheService distributedCacheService;

    @Autowired
    DistributedLockService distributedLockService;

    static String MOVIE_BUCKET = "movies";

    @Autowired
    @Qualifier("movieLocalCacheService")
    LocalCacheService<String, MovieCache> movieLocalCacheService;

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
    public MovieCache getMovieById(int movieId) {
        MovieCache movieCached = movieLocalCacheService.get(getMovieKey(movieId));
        if (movieCached != null) {
            if (movieCached.getMovieId() == -1) {
                log.info("GET MOVIE ID {} NOT FOUND FROM LOCAL CACHE", movieId);
                throw new BadRequestException(ErrorCode.MOVIE_NOT_FOUND);
            }
            log.info("GET MOVIE ID {} FROM LOCAL CACHE", movieId);
            return movieCached;
        }

        // 1. Lấy thông tin phim từ distributed cache
        movieCached = distributedCacheService.getObject(getMovieKey(movieId), MovieCache.class);
        if (movieCached != null) {
            if (movieCached.getMovieId() == -1) {
                // Khi trong database trước đó không có, thì khi đọc distributed cache qua movieId này sẽ nhận được là -1
                log.info("GET MOVIE ID {} NOT FOUND FROM DISTRIBUTED CACHE", movieId);
                throw new BadRequestException(ErrorCode.MOVIE_NOT_FOUND);
            }
            // Nếu có, quá ngon
            log.info("GET MOVIE ID {} FROM DISTRIBUTED CACHE", movieId);
            movieLocalCacheService.put(getMovieKey(movieId), movieCached);
            return movieCached;
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
            movieCached = distributedCacheService.getObject(getMovieKey(movieId), MovieCache.class);
            if (movieCached != null) {
                movieLocalCacheService.put(getMovieKey(movieId), movieCached);
                return movieCached;
            }

            // Tìm trong database
            Optional<MovieEntity> movie = movieRepository.findById(movieId);
            if (movie.isEmpty()) {
                // Nếu database không có, set set lại vào cache với time là 5s, tránh request bẩn
                log.info("GET MOVIE ID {} NOT FOUND FROM DATABASE", movieId);
                distributedCacheService.setObjectTTL(getMovieKey(movieId), movieCacheEmpty(), 5L, TimeUnit.SECONDS);
                movieLocalCacheService.put(getMovieKey(movieId), movieCacheEmpty());
                throw new BadRequestException(ErrorCode.MOVIE_NOT_FOUND);
            }

            // Set vào distributed cache
            log.info("GET MOVIE ID {} FROM DATABASE", movieId);
            MovieEntity movieEntity = movie.get();
            movieCached = MovieCache.toMovieCache(movieEntity);
            distributedCacheService.setObjectTTL(getMovieKey(movieEntity.getMovieId()), movieCached, 300L, TimeUnit.SECONDS);
            movieLocalCacheService.put(getMovieKey(movieId), movieCached);
            return movieCached;
        } catch (BadRequestException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException(e);
        } finally {
            // Dù thành công hay thất bai đều phải trả lock!!
            locker.unlock();
        }
    }

    @Override
    public MovieHome getMovieHome(int limit, int offset) {
        Pageable pageable = PageRequest.of(offset / limit, limit);
        List<MovieEntity> latestMovies = movieRepository.findAllByOrderByMovieReleaseDateDesc(pageable).getContent();
        return MovieHome.builder()
                .movies(latestMovies.stream().map(movieMapper::toMovieHomeRes).collect(Collectors.toList()))
                .build();
    }

    private String getMovieKey(int movieId) {
        return "movie:" + movieId;
    }

    private MovieCache movieCacheEmpty() {
        return MovieCache.builder()
                .movieId(-1)
                .build();
    }

}
