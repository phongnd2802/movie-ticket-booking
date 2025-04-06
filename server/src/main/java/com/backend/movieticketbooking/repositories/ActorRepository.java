package com.backend.movieticketbooking.repositories;

import com.backend.movieticketbooking.entities.movies.ActorEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActorRepository extends JpaRepository<ActorEntity, Integer> {
}
