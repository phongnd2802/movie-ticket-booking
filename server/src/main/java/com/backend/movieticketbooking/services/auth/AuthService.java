package com.backend.movieticketbooking.services.auth;

import com.backend.movieticketbooking.dtos.auth.request.LoginRequest;
import com.backend.movieticketbooking.dtos.auth.request.RegisterRequest;
import com.backend.movieticketbooking.dtos.auth.request.VerifyOTPRequest;
import com.backend.movieticketbooking.dtos.auth.response.LoginResponse;
import com.backend.movieticketbooking.dtos.auth.response.RegisterResponse;
import com.backend.movieticketbooking.dtos.auth.response.VerifyOTPResponse;

/**
 * Service interface for handling authentication and authorization processes.
 */
public interface AuthService {

    /**
     * Authenticates a user and returns an access token along with other authentication details.
     *
     * @param request the login request containing user credentials
     * @return a {@link LoginResponse} containing authentication details
     */
    LoginResponse login(LoginRequest request);

    /**
     * Registers a new user in the system.
     *
     * @param request the registration request containing user details
     * @return a {@link RegisterResponse} containing registration details
     */
    RegisterResponse register(RegisterRequest request);

    /**
     * Verifies a one-time password (OTP) sent to the user.
     *
     * @param request the OTP verification request containing user details and OTP code
     * @return a {@link VerifyOTPResponse} indicating whether the verification was successful
     */
    VerifyOTPResponse verifyOTP(VerifyOTPRequest request);

    /**
     * Logs out a user by invalidating the given token.
     *
     * @param token the token to be invalidated
     * @return {@code true} if logout is successful, {@code false} otherwise
     */
    boolean logout(String token);

    /**
     * Refreshes an expired access token using a refresh token.
     *
     * @param refreshToken the refresh token used to generate a new access token
     * @return a {@link LoginResponse} containing the new access token
     */
    LoginResponse refreshToken(String refreshToken);
}