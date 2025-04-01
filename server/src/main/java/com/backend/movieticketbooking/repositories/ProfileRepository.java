package com.backend.movieticketbooking.repositories;

import com.backend.movieticketbooking.entities.auth.ProfileEntity;
import com.backend.movieticketbooking.entities.auth.UserEntity;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileRepository extends JpaRepository<ProfileEntity, Integer> {
    @EntityGraph(attributePaths = {"user"})
    ProfileEntity findByUser(UserEntity user);
}
