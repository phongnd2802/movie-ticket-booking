package com.backend.movieticketbooking.entities.cinema;

import com.backend.movieticketbooking.entities.BaseEntity;
import com.backend.movieticketbooking.entities.other.AddressEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class CinemaEntity extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cinema_id")
    int cinemaId;

    String cinemaName;

    String cinemaStreet;

    @OneToOne
    @JoinColumn(name = "address_id")
    AddressEntity address;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "cinema_id")
    @JsonIgnore
    List<CinemaHallEntity> cinemaHalls;
}
