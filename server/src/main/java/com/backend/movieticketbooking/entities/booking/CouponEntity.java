package com.backend.movieticketbooking.entities.booking;

import com.backend.movieticketbooking.entities.BaseEntity;
import com.backend.movieticketbooking.entities.show.ShowEntity;
import com.backend.movieticketbooking.enums.CouponTypeEnum;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CouponEntity extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "coupon_id")
    String couponId;

    String couponName;

    String couponDescription;

    String couponCode;

    CouponTypeEnum couponType;

    BigDecimal couponValue;

    LocalDateTime couponStart;

    LocalDateTime couponEnd;

    int couponMaxUses;

    int couponUseCount;

    BigDecimal couponLimit;

    boolean couponIsActive;

    @ManyToMany
    @JoinTable(
        name = "coupon_show",
        joinColumns = @JoinColumn(name = "coupon_id"),
        inverseJoinColumns = @JoinColumn(name = "show_id")
    )
    List<ShowEntity> shows;

}
