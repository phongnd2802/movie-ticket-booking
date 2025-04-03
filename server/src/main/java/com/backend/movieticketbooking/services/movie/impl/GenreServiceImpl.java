package com.backend.movieticketbooking.services.movie.impl;

import com.backend.movieticketbooking.common.ErrorCode;
import com.backend.movieticketbooking.dtos.movie.GenreDTO;
import com.backend.movieticketbooking.entities.movies.GenreEntity;
import com.backend.movieticketbooking.exceptions.BadRequestException;
import com.backend.movieticketbooking.mapper.GenreMapper;
import com.backend.movieticketbooking.repositories.GenreRepository;
import com.backend.movieticketbooking.services.movie.GenreService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class GenreServiceImpl implements GenreService {

    GenreRepository genreRepository;

    GenreMapper genreMapper;

    @Override
    public GenreDTO addGenre(String genreName) {
        log.info("Adding genre: {}", genreName);
        Optional<GenreEntity> foundGenre = genreRepository.findByGenreName(genreName);
        if (foundGenre.isPresent()) {
            throw new BadRequestException(ErrorCode.GENRE_ALREADY_EXISTS);
        }

        GenreEntity genre = GenreEntity.builder().genreName(genreName).build();
        genreRepository.save(genre);

        return genreMapper.toGenreDTO(genre);
    }
}
