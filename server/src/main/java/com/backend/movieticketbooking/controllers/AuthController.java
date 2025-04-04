package com.backend.movieticketbooking.controllers;


import com.backend.movieticketbooking.common.ApiResponse;
import com.backend.movieticketbooking.common.ErrorCode;
import com.backend.movieticketbooking.dtos.auth.request.LoginRequest;
import com.backend.movieticketbooking.dtos.auth.request.RegisterRequest;
import com.backend.movieticketbooking.dtos.auth.request.ResendOTPRequest;
import com.backend.movieticketbooking.dtos.auth.request.VerifyOTPRequest;
import com.backend.movieticketbooking.dtos.auth.response.LoginResponse;
import com.backend.movieticketbooking.dtos.auth.response.RefreshTokenResponse;
import com.backend.movieticketbooking.dtos.auth.response.RegisterResponse;
import com.backend.movieticketbooking.exceptions.BadRequestException;
import com.backend.movieticketbooking.services.auth.AuthService;
import io.netty.util.internal.StringUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ApiResponse<LoginResponse> login(@RequestBody LoginRequest request, HttpServletRequest httpServletRequest) {
        String userAgent = httpServletRequest.getHeader("User-Agent");
        if (StringUtil.isNullOrEmpty(userAgent)) {
            throw new BadRequestException(ErrorCode.USER_AGENT_NOT_SUPPORTED);
        }
        request.setUserAgent(userAgent);
        String ipAddress = httpServletRequest.getRemoteAddr();
        if (StringUtil.isNullOrEmpty(ipAddress)) {
            throw new BadRequestException(ErrorCode.IP_ADDRESS_EMPTY);
        }
        request.setLoginIp(ipAddress);
        LoginResponse result = authService.login(request);
        return ApiResponse.success(result);
    }

    @PostMapping("/register")
    public ApiResponse<RegisterResponse> register(@RequestBody RegisterRequest request) {
        System.out.println("vô đây");
        RegisterResponse result = authService.register(request);
        return ApiResponse.success(result);
    }

    @PostMapping("/logout")
    public ApiResponse<?> logout(HttpServletRequest request) {
        String authorizationHeader = request.getHeader("Authorization");
        String token = authorizationHeader.substring(7);
        authService.logout(token);

        return ApiResponse.success(null);
    }

    @PostMapping("/verify-otp")
    public ApiResponse<Boolean> verifyOTP(@RequestBody VerifyOTPRequest request) {
        Boolean result = authService.verifyOTP(request);
        return ApiResponse.success(result);
    }

    @GetMapping("/otp-session")
    public ApiResponse<Long> getOTPSession(@RequestParam String token) {
        Long ttl = authService.getTimeToLiveOTP(token);
        return ApiResponse.success(ttl);
    }

    @PatchMapping("/refresh-token")
    public ApiResponse<RefreshTokenResponse> refreshToken(HttpServletRequest request) {
        String authorizationHeader = request.getHeader("Authorization");
        String token = authorizationHeader.substring(7);

        RefreshTokenResponse result = authService.refreshToken(token);
        return ApiResponse.success(result);
    }

    @PatchMapping("/resend-otp")
    public ApiResponse<?> resendOTP(@RequestBody ResendOTPRequest request) {
        authService.resendOTP(request);
        return ApiResponse.success(null);
    }
}
