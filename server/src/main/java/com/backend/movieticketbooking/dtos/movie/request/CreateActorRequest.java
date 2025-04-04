package com.backend.movieticketbooking.dtos.movie.request;

import com.backend.movieticketbooking.entities.movies.MovieEntity;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@Data
public class CreateActorRequest {
    private String actorName;

    private MultipartFile actorImage;

    private String actorBirthDate;

    private List<MovieEntity> movies;
}
