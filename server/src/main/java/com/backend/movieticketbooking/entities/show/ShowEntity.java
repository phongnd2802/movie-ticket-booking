package com.backend.movieticketbooking.entities.show;

import com.backend.movieticketbooking.entities.BaseEntity;
import com.backend.movieticketbooking.entities.booking.BookingEntity;
import com.backend.movieticketbooking.entities.booking.CouponEntity;
import com.backend.movieticketbooking.entities.cinema.CinemaHallEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ShowEntity extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "show_id")
    int showId;

    LocalDateTime showStartTime;

    LocalDateTime showEndTime;

    @ManyToMany(mappedBy = "shows")
    List<CouponEntity> coupons;

    @ManyToOne
    @JoinColumn(name = "cinema_hall_id", nullable = false)
    CinemaHallEntity cinemaHall;

    @OneToMany(mappedBy = "show", fetch = FetchType.LAZY)
    List<BookingEntity> bookings;

    @OneToMany(mappedBy = "show", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    List<ShowSeatEntity> showSeats;

}
