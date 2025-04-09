package com.backend.movieticketbooking.entities.movies;

import com.backend.movieticketbooking.entities.BaseEntity;
import com.backend.movieticketbooking.entities.show.ShowEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class MovieEntity extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "movie_id")
    int movieId;

    String movieName;

    @Column(columnDefinition = "TEXT")
    String movieDescription;

    int movieAge;

    String movieThumbnail;

    String movieTrailer;

    BigDecimal movieRating;

    int movieVoteCount;

    int movieDuration; // minute

    String movieLanguage;

    String movieCountry;

    LocalDate movieReleaseDate;

    String movieDirector;

    String movieProducer;

    @ManyToMany(mappedBy = "movies")
    List<GenreEntity> genres;

    @OneToMany(mappedBy = "movie", fetch = FetchType.LAZY)
    @JsonIgnore
    List<ShowEntity> shows;

    @ManyToMany(mappedBy = "movies")
    List<ActorEntity> actors;
}
