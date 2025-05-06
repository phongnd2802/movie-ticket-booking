package com.backend.movieticketbooking.entities.auth;

import com.backend.movieticketbooking.entities.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;


@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class ProfileEntity extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Tự động tăng ID
    int profileId;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", unique = true)
    UserEntity user;

    String userName;

    String userEmail;

    String userMobile;

    boolean userGender;

    LocalDate userBirthday;
}
