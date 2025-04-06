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
@Builder
public class CinemaHallEntity extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int cinemaHallId;

    String cinemaHallName;

    int cinemaSeatsNumberAvailable;

    @ManyToOne
    @JoinColumn(name = "cinema_id", nullable = false)
    CinemaEntity cinema;

    @OneToMany(mappedBy = "cinemaHall", fetch = FetchType.LAZY)
    List<ShowEntity> shows;

    @OneToMany(mappedBy = "cinemaHall", fetch = FetchType.LAZY)
    List<CinemaHallSeatEntity> cinemaHallSeats;
}
