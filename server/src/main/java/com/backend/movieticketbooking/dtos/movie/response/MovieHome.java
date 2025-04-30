package com.backend.movieticketbooking.dtos.movie.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class MovieHome {
    private List<MovieHomeRes> movies;
}
