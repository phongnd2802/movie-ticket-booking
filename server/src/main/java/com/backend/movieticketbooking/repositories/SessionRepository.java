package com.backend.movieticketbooking.repositories;

import com.backend.movieticketbooking.entities.auth.SessionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface SessionRepository extends JpaRepository<SessionEntity, String> {
    Optional<SessionEntity> findByRefreshTokenUsed(String refreshToken);
}
