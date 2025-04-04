package com.backend.movieticketbooking.repositories;

import com.backend.movieticketbooking.entities.show.ShowSeatEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShowSeatRepository extends JpaRepository<ShowSeatEntity, Integer> {

}
