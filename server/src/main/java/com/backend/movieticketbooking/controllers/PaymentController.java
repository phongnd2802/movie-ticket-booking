package com.backend.movieticketbooking.controllers;


import com.backend.movieticketbooking.common.ApiResponse;
import com.backend.movieticketbooking.dtos.booking.BookingDTO;
import com.backend.movieticketbooking.dtos.payment.PaymentDTO;
import com.backend.movieticketbooking.services.payment.PaymentService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PaymentController {
    PaymentService paymentService;


    @PostMapping("/vnpay-create")
    @PreAuthorize("hasAuthority('CUSTOMER')")
    public ApiResponse<String> createPayment(@RequestBody PaymentDTO paymentRequest, HttpServletRequest request) {
        String paymentUrl = paymentService.createPaymentUrl(paymentRequest, request);
        return ApiResponse.success(paymentUrl);
    }


    @GetMapping("/vnpay-callback")
    @PreAuthorize("hasAuthority('CUSTOMER')")
    public ApiResponse<BookingDTO> handleVNPayReturn(HttpServletRequest request) {
        return ApiResponse.success(paymentService.processPayment(request));
    }
}
