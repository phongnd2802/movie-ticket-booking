package com.backend.movieticketbooking.dtos.auth.request;


import lombok.Data;

@Data
public class RegisterRequest {
    private String userName;
    private String userEmail;
    private String userPassword;
    private String userMobile;
    private boolean userGender;
    private String userBirthday;
}
