package com.backend.movieticketbooking.entities.booking;

import com.backend.movieticketbooking.entities.BaseEntity;
import com.backend.movieticketbooking.enums.CouponTypeEnum;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDateTime;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CouponEntity extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int couponId;

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

}
