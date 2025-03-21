package com.backend.movieticketbooking.services.auth;

import com.backend.movieticketbooking.dtos.auth.request.LoginRequest;
import com.backend.movieticketbooking.dtos.auth.request.RegisterRequest;
import com.backend.movieticketbooking.dtos.auth.request.VerifyOTPRequest;
import com.backend.movieticketbooking.dtos.auth.response.LoginResponse;
import com.backend.movieticketbooking.dtos.auth.response.RegisterResponse;
import com.backend.movieticketbooking.dtos.auth.response.VerifyOTPResponse;

public interface AuthService {

    // Login
    LoginResponse login(LoginRequest request);

    // Register
    RegisterResponse register(RegisterRequest request);

    // Verify OTP
    VerifyOTPResponse verifyOTP(VerifyOTPRequest request);

    // Logout
    boolean logout(String token);

    // Refresh Token
    LoginResponse refreshToken(String refreshToken);
}
