package com.backend.movieticketbooking.dtos.auth.request;


import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
    private String userAgent;
    private String loginIp;
}
