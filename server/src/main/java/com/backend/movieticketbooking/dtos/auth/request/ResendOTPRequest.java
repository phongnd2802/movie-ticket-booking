package com.backend.movieticketbooking.dtos.auth.request;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResendOTPRequest {
    private String email;
    private String token;
}
