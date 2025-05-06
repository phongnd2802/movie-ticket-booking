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
@Builder
public class SessionEntity extends BaseEntity {
    @Id
    @Column(name = "session_id")
    String sessionId;

    String refreshToken;

    String refreshTokenUsed;

    String userAgent;

    String userLoginIp;

    LocalDateTime userLoginTime;

    LocalDateTime expiresAt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    UserEntity user;
}
