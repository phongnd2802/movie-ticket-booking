package com.backend.movieticketbooking.entities.auth;

import com.backend.movieticketbooking.entities.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;


@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProfileEntity extends BaseEntity {
    @Id
    @OneToOne
    @JoinColumn(name = "user_id")
    UserEntity user;

    String userName;

    String userEmail;

    String userMobile;

    boolean userGender;

    LocalDate userBirthday;

}
