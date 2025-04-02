package com.backend.movieticketbooking.dtos.auth;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO {
    private String userEmail;

    private String userName;

    private String userMobile;

    private boolean userGender;

    private LocalDate userBirthday;
}
