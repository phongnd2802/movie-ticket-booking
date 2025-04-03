package com.backend.movieticketbooking.dtos.movie.request;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;



@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateMovieRequest {
    private String movieName;

    private String movieDescription;

    private int movieAge;

    private MultipartFile movieThumbnail;

    private String movieTrailer;

    private int movieDuration; // minute

    private String movieLanguage;

    private String movieCountry;

    private String movieReleaseDate;

    private String movieDirector;

    private String movieProducer;

}
