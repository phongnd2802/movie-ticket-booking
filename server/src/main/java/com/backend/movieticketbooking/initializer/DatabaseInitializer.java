package com.backend.movieticketbooking.initializer;


import com.backend.movieticketbooking.entities.auth.ProfileEntity;
import com.backend.movieticketbooking.entities.auth.UserEntity;
import com.backend.movieticketbooking.enums.RoleEnum;
import com.backend.movieticketbooking.repositories.ProfileRepository;
import com.backend.movieticketbooking.repositories.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Component
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DatabaseInitializer {

    UserRepository userRepository;

    ProfileRepository profileRepository;

    PasswordEncoder passwordEncoder;

    JdbcTemplate jdbcTemplate;

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


    static final int BATCH_SIZE = 1000;
    @PostConstruct
    public void initAddressData() {
        log.info("Creating address data");
        try {
            ClassPathResource resource = new ClassPathResource("data.sql");
            BufferedReader reader = new BufferedReader(new InputStreamReader(resource.getInputStream()));

            List<String> batchStatements = new ArrayList<>();
            StringBuilder sqlStatement = new StringBuilder();

            String line;

            while ((line = reader.readLine()) != null) {
                line = line.trim();
                if (line.isEmpty() || line.startsWith("--")) {
                    continue;
                }

                sqlStatement.append(line).append(" ");
                if (line.endsWith(";")) {
                    batchStatements.add(sqlStatement.toString());
                    sqlStatement.setLength(0);

                    if (batchStatements.size() >= BATCH_SIZE) {
                        executeBatch(batchStatements);
                        batchStatements.clear();
                    }
                }
            }

            if (!batchStatements.isEmpty()) {
                executeBatch(batchStatements);
            }
            log.info("Successfully created address data");
        } catch (Exception e){
            e.printStackTrace();
            log.error(e.getMessage());
        }
    }


    void executeBatch(List<String> batchStatements) {
        try {
            jdbcTemplate.batchUpdate(batchStatements.toArray(new String[0]));
            System.out.println("Executed batch of " + batchStatements.size() + " SQL statements.");
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("Error executing batch: " + e.getMessage());
        }
    }
}
