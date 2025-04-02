package com.backend.movieticketbooking.services.kafka.message;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OtpMessage {
    private String email;
    private String otp;
}
