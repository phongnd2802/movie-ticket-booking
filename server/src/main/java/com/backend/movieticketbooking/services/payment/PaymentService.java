package com.backend.movieticketbooking.services.payment;

import com.backend.movieticketbooking.dtos.payment.PaymentDTO;
import jakarta.servlet.http.HttpServletRequest;

public interface PaymentService {
    String createPaymentUrl(PaymentDTO paymentRequest, HttpServletRequest request);
}
