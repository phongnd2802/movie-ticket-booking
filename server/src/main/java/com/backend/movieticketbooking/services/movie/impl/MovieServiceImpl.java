package com.backend.movieticketbooking.services.movie.impl;


import com.backend.movieticketbooking.dtos.movie.MovieDTO;
import com.backend.movieticketbooking.dtos.movie.request.CreateMovieRequest;
import com.backend.movieticketbooking.entities.movies.MovieEntity;
import com.backend.movieticketbooking.mapper.MovieMapper;
import com.backend.movieticketbooking.repositories.MovieRepository;
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

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class MovieServiceImpl implements MovieService {

    StorageService storageService;

    MovieRepository movieRepository;

    MovieMapper movieMapper;

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
    public MovieDTO getMovieById(Long movieId) {
        return null;
    }
}
