package com.backend.movieticketbooking.entities.movies;

import com.backend.movieticketbooking.entities.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class GenreEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "genre_id")
    int genreId;

    @Column(unique = true, nullable = false)
    String genreName;

    @ManyToMany
    @JoinTable(
        name = "movie_genre",
        joinColumns = @JoinColumn(name = "genre_id"),
        inverseJoinColumns = @JoinColumn(name = "movie_id")
    )
    List<MovieEntity> movies;


}
