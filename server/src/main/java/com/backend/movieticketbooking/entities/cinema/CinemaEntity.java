package com.backend.movieticketbooking.entities.cinema;

import com.backend.movieticketbooking.entities.BaseEntity;
import com.backend.movieticketbooking.entities.other.AddressEntity;
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
public class CinemaEntity extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cinema_id")
    int cinemaId;

    String cinemaName;

    @OneToOne
    @JoinColumn(name = "adcress_id")
    AddressEntity adress;

    @OneToMany
    @JoinColumn(name = "cinema_id")
    List<CinemaHallEntity> cinemaHalls;
}
