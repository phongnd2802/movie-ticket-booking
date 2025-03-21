package com.backend.movieticketbooking.services.auth.impl;

import com.backend.movieticketbooking.dtos.auth.request.LoginRequest;
import com.backend.movieticketbooking.dtos.auth.request.RegisterRequest;
import com.backend.movieticketbooking.dtos.auth.request.VerifyOTPRequest;
import com.backend.movieticketbooking.dtos.auth.response.LoginResponse;
import com.backend.movieticketbooking.dtos.auth.response.RegisterResponse;
import com.backend.movieticketbooking.dtos.auth.response.VerifyOTPResponse;
import com.backend.movieticketbooking.services.auth.AuthService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;


@Service
@Slf4j
public class AuthServiceImpl implements AuthService {

    @Override
    public LoginResponse login(LoginRequest request) {
        return null;
    }

    @Override
    public RegisterResponse register(RegisterRequest request) {
        return null;
    }

    @Override
    public VerifyOTPResponse verifyOTP(VerifyOTPRequest request) {
        return null;
    }

    @Override
    public boolean logout(String token) {
        return false;
    }

    @Override
    public LoginResponse refreshToken(String refreshToken) {
        return null;
    }
}
