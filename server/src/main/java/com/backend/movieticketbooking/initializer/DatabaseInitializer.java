package com.backend.movieticketbooking.initializer;



import com.backend.movieticketbooking.entities.auth.ProfileEntity;
import com.backend.movieticketbooking.entities.auth.UserEntity;
import com.backend.movieticketbooking.enums.RoleEnum;
import com.backend.movieticketbooking.repositories.ProfileRepository;
import com.backend.movieticketbooking.repositories.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Set;

@Component
@Slf4j
public class DatabaseInitializer {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostConstruct
    @Transactional
    public void createAdminAccount() {
        log.info("Creating admin account");

        UserEntity user = UserEntity.builder()
                .userEmail("admin@backend.com")
                .userPassword(passwordEncoder.encode("admin123"))
                .userOtp("123456")
                .userDeleted(false)
                .userVerified(true)
                .roles(Set.of(RoleEnum.ADMIN, RoleEnum.CUSTOMER))
                .build();
        userRepository.save(user);

        ProfileEntity profile = ProfileEntity.builder()
                .userMobile("0001112223")
                .userEmail("admin@backend.com")
                .userBirthday(LocalDate.now())
                .userGender(true)
                .user(user)
                .build();


        profileRepository.save(profile);
    }
}
