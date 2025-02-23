package com.backend.movieticketbooking.entities.auth;

import com.backend.movieticketbooking.entities.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;


@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class SessionEntity extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String sessionId;

    String refreshToken;

    String refreshTokenUsed;

    String publicKey;

    String userAgent;

    String userLoginIp;

    LocalDateTime userLoginTime;

    LocalDateTime userLogoutTime;

    LocalDateTime expiresAt;

}
