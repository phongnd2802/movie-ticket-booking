package com.backend.movieticketbooking.entities.movies;

import com.backend.movieticketbooking.entities.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.List;


@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class ActorEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "actor_id")
    int actorId;

    String actorName;

    String actorImage;

    LocalDate actorBirthDate;

    @ManyToMany(mappedBy = "actors")
    List<GenreEntity> genres;

    @ManyToMany
    @JoinTable(
        name = "actor_movie",
        joinColumns = @JoinColumn(name = "actor_id"),
        inverseJoinColumns = @JoinColumn(name = "movie_id")
    )
    List<MovieEntity> movies;
}
