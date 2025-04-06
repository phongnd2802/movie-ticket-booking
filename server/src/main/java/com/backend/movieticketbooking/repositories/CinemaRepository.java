package com.backend.movieticketbooking.repositories;

import com.backend.movieticketbooking.entities.cinema.CinemaEntity;
import com.backend.movieticketbooking.entities.other.AddressEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CinemaRepository extends JpaRepository<CinemaEntity, Integer> {
    Optional<CinemaEntity> findByCinemaStreetAndAddress(String street, AddressEntity address);
}
