package com.backend.movieticketbooking.entities.auth;


import com.backend.movieticketbooking.entities.BaseEntity;
import com.backend.movieticketbooking.entities.booking.BookingEntity;
import com.backend.movieticketbooking.entities.other.NotificationEntity;
import com.backend.movieticketbooking.enums.PermissionEnum;
import com.backend.movieticketbooking.enums.RoleEnum;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.BatchSize;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class UserEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    int userId;

    String userEmail;

    String userPassword;

    String userOtp;

    boolean userVerified;

    boolean userDeleted;

    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    List<SessionEntity> userSessions;

    @OneToOne(mappedBy = "user", fetch = FetchType.EAGER)
    ProfileEntity profile;

    @ElementCollection(targetClass = RoleEnum.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"))
    @Enumerated(EnumType.STRING)
    @BatchSize(size = 10)
    private Set<RoleEnum> roles;

    public Set<PermissionEnum> getPermissions() {
        return roles.stream()
                .flatMap(role -> role.getPermissions().stream())
                .collect(Collectors.toSet());
    }

    @OneToMany
    @JoinColumn(name = "user_id")
    List<BookingEntity> bookings;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    List<NotificationEntity> notifications;

}
