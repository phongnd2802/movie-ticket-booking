package com.backend.movieticketbooking.services.auth;

import com.backend.movieticketbooking.dtos.auth.request.LoginRequest;
import com.backend.movieticketbooking.dtos.auth.request.RegisterRequest;
import com.backend.movieticketbooking.dtos.auth.request.ResendOTPRequest;
import com.backend.movieticketbooking.dtos.auth.request.VerifyOTPRequest;
import com.backend.movieticketbooking.dtos.auth.response.LoginResponse;
import com.backend.movieticketbooking.dtos.auth.response.RefreshTokenResponse;
import com.backend.movieticketbooking.dtos.auth.response.RegisterResponse;

/**
 * Service interface for handling authentication and authorization processes.
 */
public interface AuthService {

    LoginResponse login(LoginRequest request);

    RegisterResponse register(RegisterRequest request);


    Boolean verifyOTP(VerifyOTPRequest request);

    void logout(String token);

    RefreshTokenResponse refreshToken(String refreshToken);

    Long getTimeToLiveOTP(String token);

    void resendOTP(ResendOTPRequest request);
}