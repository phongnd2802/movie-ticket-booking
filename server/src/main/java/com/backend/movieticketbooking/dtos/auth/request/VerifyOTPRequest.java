package com.backend.movieticketbooking.dtos.auth.request;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VerifyOTPRequest {

    @NotBlank(message = "email is required")
    @Email(message = "invalid email format")
    private String email;

    @NotBlank(message = "token is required")
    private String token;

    @NotBlank(message = "otp is required")
    @Pattern(regexp = "^[0-9]{6}$", message = "otp must be 6 digits")
    private String otp;
}
