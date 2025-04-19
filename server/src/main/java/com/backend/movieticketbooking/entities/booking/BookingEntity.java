package com.backend.movieticketbooking.entities.booking;

import com.backend.movieticketbooking.entities.BaseEntity;
import com.backend.movieticketbooking.entities.auth.UserEntity;
import com.backend.movieticketbooking.entities.cinema.CinemaHallEntity;
import com.backend.movieticketbooking.entities.cinema.CinemaHallSeatEntity;
import com.backend.movieticketbooking.entities.other.FoodEntity;
import com.backend.movieticketbooking.entities.show.ShowEntity;
import com.backend.movieticketbooking.entities.show.ShowSeatEntity;
import com.backend.movieticketbooking.enums.BookingStateEnum;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.util.List;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class BookingEntity extends BaseEntity {
    @Id
    @Column(name = "booking_id")
    String bookingId;

    BigDecimal bookingTotalPrice;

    BookingStateEnum bookingState;

    int bookingNumberOfSeats;

    @ManyToOne
    @JoinColumn(name = "show_id", nullable = false)
    ShowEntity show;

    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    List<ShowSeatEntity> showSeats;

    @OneToMany
    @JoinColumn(name = "coupon_id")
    List<CouponEntity> coupons;

    @ManyToMany
    @JoinTable(
        name = "booking_food",
        joinColumns = @JoinColumn(name = "booking_id"),
        inverseJoinColumns = @JoinColumn(name = "food_id")
    )
    List<FoodEntity> foods;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    UserEntity user;
}
