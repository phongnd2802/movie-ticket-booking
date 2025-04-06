package com.backend.movieticketbooking.repositories;

import com.backend.movieticketbooking.entities.auth.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface UserRepository extends JpaRepository<UserEntity, Integer> {
    Optional<UserEntity> findByUserEmail(String email);
}
