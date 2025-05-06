package com.backend.movieticketbooking.services.movie.cache.models;

import com.backend.movieticketbooking.entities.movies.ActorEntity;
import com.backend.movieticketbooking.entities.movies.GenreEntity;
import com.backend.movieticketbooking.entities.movies.MovieEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MovieCache {
    int movieId;
    String movieName;
    String movieDescription;
    int movieAge;
    String movieThumbnail;
    String movieTrailer;
    BigDecimal movieRating;
    int movieDuration;
    String movieLanguage;
    String movieCountry;
    String movieReleaseDate;
    String movieDirector;
    String movieProducer;
    List<String> genres;
    List<String> actors;
    List<ShowCache> shows;

    public static MovieCache toMovieCache(MovieEntity movieEntity) {
        return MovieCache.builder()
                .movieId(movieEntity.getMovieId())
                .movieName(movieEntity.getMovieName())
                .movieDescription(movieEntity.getMovieDescription())
                .movieAge(movieEntity.getMovieAge())
                .movieThumbnail(movieEntity.getMovieThumbnail())
                .movieTrailer(movieEntity.getMovieTrailer())
                .movieRating(movieEntity.getMovieRating())
                .movieDuration(movieEntity.getMovieDuration())
                .movieLanguage(movieEntity.getMovieLanguage())
                .movieCountry(movieEntity.getMovieCountry())
                .movieReleaseDate(movieEntity.getMovieReleaseDate().toString())
                .movieDirector(movieEntity.getMovieDirector())
                .movieProducer(movieEntity.getMovieProducer())
                .genres(
                        movieEntity.getGenres() != null
                        ? movieEntity.getGenres().stream()
                                .map(GenreEntity::getGenreName)
                                .collect(Collectors.toList()) : null
                )
                .actors(
                        movieEntity.getActors() != null
                        ? movieEntity.getActors().stream()
                                .map(ActorEntity::getActorName)
                                .collect(Collectors.toList()) : null
                )
                .shows(ShowCache.toShowCaches(movieEntity.getShows()))
                .build();
    }
}
