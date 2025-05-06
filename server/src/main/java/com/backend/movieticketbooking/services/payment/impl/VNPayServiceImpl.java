package com.backend.movieticketbooking.services.payment.impl;

import com.backend.movieticketbooking.common.ErrorCode;
import com.backend.movieticketbooking.configs.VNPAYConfig;
import com.backend.movieticketbooking.dtos.payment.PaymentDTO;
import com.backend.movieticketbooking.entities.booking.BookingEntity;
import com.backend.movieticketbooking.entities.booking.PaymentEntity;
import com.backend.movieticketbooking.enums.PaymentStatusEnum;
import com.backend.movieticketbooking.exceptions.BadRequestException;
import com.backend.movieticketbooking.repositories.BookingRepository;
import com.backend.movieticketbooking.repositories.PaymentRepository;
import com.backend.movieticketbooking.services.payment.PaymentService;
import com.backend.movieticketbooking.utils.SnowflakeGenerator;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class VNPayServiceImpl implements PaymentService {
    private static final String VNP_VERSION = "2.1.0";
    private static final String VNP_COMMAND = "pay";
    private static final String VNP_TMN_CODE = "xxxxxx";
    private static final String ORDER_TYPE = "other";
    private static final String CURRENCY_CODE = "VND";
    private static final String LOCALE = "vn";
    private static final String RETURN_URL = "http://localhost:8080/api/v1/payment/vn-pay-callback";
    private static final String DATE_FORMAT = "yyyyMMddHHmmss";
    private static final int EXPIRY_MINUTES = 15;
    private static final int AMOUNT_MULTIPLIER = 100;

    @Autowired
    SnowflakeGenerator snowflakeGenerator;

    @Autowired
    PaymentRepository paymentRepository;

    @Autowired
    BookingRepository bookingRepository;

    @Override
    public String createPaymentUrl(PaymentDTO paymentRequest, HttpServletRequest request) {
        Map<String, String> params = initializeParameters(paymentRequest, request);
        Optional<BookingEntity> bookingEntity = bookingRepository.findById(paymentRequest.getBookingId());
        if (bookingEntity.isEmpty()) {
            throw new BadRequestException(ErrorCode.BOOKING_NOT_FOUND);
        }
        PaymentEntity paymentEntity = PaymentEntity.builder()
                .transactionId(params.get("vnp_TxnRef"))
                .paymentMethod("VNPay")
                .paymentStatus(PaymentStatusEnum.PENDING)
                .amount(BigDecimal.valueOf(paymentRequest.getAmount()))
                .booking(bookingEntity.get())
                .build();

        paymentRepository.save(paymentEntity);

        String queryString = buildQueryString(params);
        String secureHash = generateSecureHash(queryString);
        return VNPAYConfig.vnp_PayUrl + "?" + queryString + "&vnp_SecureHash=" + secureHash;
    }

    private Map<String, String> initializeParameters(PaymentDTO paymentRequest, HttpServletRequest request) {
        Map<String, String> params = new HashMap<>();

        // Basic parameters
        params.put("vnp_Version", VNP_VERSION);
        params.put("vnp_Command", VNP_COMMAND);
        params.put("vnp_TmnCode", VNP_TMN_CODE);
        params.put("vnp_Amount", String.valueOf(paymentRequest.getAmount() * AMOUNT_MULTIPLIER));
        params.put("vnp_CurrCode", CURRENCY_CODE);
        params.put("vnp_TxnRef", String.valueOf(snowflakeGenerator.nextId()));
        params.put("vnp_OrderInfo", "Thanh toan don hang: " + paymentRequest.getBookingId());
        params.put("vnp_OrderType", ORDER_TYPE);
        params.put("vnp_Locale", LOCALE);
        params.put("vnp_ReturnUrl", RETURN_URL);
        params.put("vnp_IpAddr", VNPAYConfig.getIpAddress(request));

        // Optional bank code
        String bankCode = paymentRequest.getBankCode();
        if (bankCode != null && !bankCode.isEmpty()) {
            params.put("vnp_BankCode", bankCode);
        }

        // Date parameters
        Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat(DATE_FORMAT);

        params.put("vnp_CreateDate", formatter.format(calendar.getTime()));
        calendar.add(Calendar.MINUTE, EXPIRY_MINUTES);
        params.put("vnp_ExpireDate", formatter.format(calendar.getTime()));

        return params;
    }

    private String buildQueryString(Map<String, String> params) {
        List<String> fieldNames = new ArrayList<>(params.keySet());
        Collections.sort(fieldNames);

        StringBuilder query = new StringBuilder();
        StringBuilder hashData = new StringBuilder();

        for (String fieldName : fieldNames) {
            String fieldValue = params.get(fieldName);
            if (fieldValue != null && !fieldValue.isEmpty()) {
                try {
                    String encodedName = URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString());
                    String encodedValue = URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString());

                    // Build query
                    query.append(encodedName).append('=').append(encodedValue);
                    // Build hash data
                    hashData.append(encodedName).append('=').append(encodedValue);

                    if (!fieldName.equals(fieldNames.get(fieldNames.size() - 1))) {
                        query.append('&');
                        hashData.append('&');
                    }
                } catch (UnsupportedEncodingException e) {
                    throw new RuntimeException("Error encoding URL parameters", e);
                }
            }
        }

        return query.toString();
    }

    private String generateSecureHash(String hashData) {
        return VNPAYConfig.hmacSHA512(VNPAYConfig.vnp_HashSecret, hashData);
    }
}
