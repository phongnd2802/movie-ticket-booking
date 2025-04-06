package com.backend.movieticketbooking.dtos.cinema;


import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CinemaDTO {
    private int cinemaId;

    @NotBlank(message = "cinemaName is required")
    private String cinemaName;

    @NotBlank(message = "cinemaStreet is required")
    private String cinemaStreet;

    @NotBlank(message = "cinemaProvince is required")
    private String cinemaProvince;

    @NotBlank(message = "cinemaDistrict is required")
    private String cinemaDistrict;

    @NotBlank(message = "cinemaWard is required")
    private String cinemaWard;
}
