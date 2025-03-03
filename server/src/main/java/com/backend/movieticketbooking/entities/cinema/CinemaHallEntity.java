package com.backend.movieticketbooking.entities.cinema;

import com.backend.movieticketbooking.entities.BaseEntity;
import com.backend.movieticketbooking.entities.show.ShowEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CinemaHallEntity extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cinema_hall_id")
    int cinemaHallId;

    String cinemaHallName;

    int cinemaSeatsNumberAvailable;


    @OneToMany
    @JoinColumn(name = "cenima_hall_id")
    List<CinemaHallSeatEntity> cinemaHallSeats;
}
