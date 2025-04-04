package com.backend.movieticketbooking.dtos.cinema;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CinemaDTO {
    private int cinemaId;
    private String cinemaName;
    private String cinemaStreet;
    private String cinemaProvince;
    private String cinemaDistrict;
    private String cinemaWard;
}
