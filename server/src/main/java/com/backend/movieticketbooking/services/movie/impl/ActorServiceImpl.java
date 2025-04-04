package com.backend.movieticketbooking.services.movie.impl;

import com.backend.movieticketbooking.dtos.movie.ActorDTO;
import com.backend.movieticketbooking.dtos.movie.request.CreateActorRequest;
import com.backend.movieticketbooking.entities.movies.ActorEntity;
import com.backend.movieticketbooking.mapper.ActorMapper;
import com.backend.movieticketbooking.repositories.ActorRepository;
import com.backend.movieticketbooking.services.movie.ActorService;
import com.backend.movieticketbooking.services.storage.StorageService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;


@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ActorServiceImpl implements ActorService {

    ActorRepository actorRepository;

    StorageService storageService;


    ActorMapper actorMapper;

    static final String ACTOR_BUCKET = "actors";

    @Override
    public ActorDTO createActor(CreateActorRequest request) {
        String objectUri;
        try (InputStream inputStream = request.getActorImage().getInputStream()) {
            objectUri = storageService.uploadFile(ACTOR_BUCKET, request.getActorImage().getOriginalFilename(), inputStream, "image/*");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        ActorEntity actor = ActorEntity.builder()
                .actorBirthDate(LocalDate.parse(request.getActorBirthDate()))
                .actorName(request.getActorName())
                .actorImage(objectUri)
                .build();

        actorRepository.save(actor);

        return actorMapper.toActorDTO(actor);
    }


}
