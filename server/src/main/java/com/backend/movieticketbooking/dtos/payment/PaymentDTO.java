package com.backend.movieticketbooking.dtos.payment;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PaymentDTO {
    private String bookingId;
    private int amount;
    private String bankCode;
}
