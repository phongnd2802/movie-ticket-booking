package com.backend.movieticketbooking.dtos.auth.request;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RegisterRequest {
    private String userName;
    private String userEmail;
    private String userPassword;
    private String userMobile;
    private boolean userGender;
    private String userBirthday;
}
