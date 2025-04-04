package com.backend.movieticketbooking.common;


import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {
    SUCCESS(20000, "success"),
    BAD_REQUEST(40000, "bad request"),
    UNAUTHORIZED(40001, "unauthorized"),
    USER_AGENT_NOT_SUPPORTED(40011, "user agent not supported"),
    IP_ADDRESS_EMPTY(40012, "ip address is empty"),
    AUTHENTICATION_FAILED(40013, "authentication failed"),
    EMAIL_ALREADY_EXISTS(40014, "email already exists"),
    OTP_SESSION_EXPIRED(40015, "otp session expired"),
    OTP_DOES_NOT_MATCH(40016, "otp does not match"),
    EMAIL_NOT_FOUND(40017, "email not found"),
    REFRESH_TOKEN_USED(40018, "Suspicious activity detected: Refresh token has been used."),
    SESSION_NOT_FOUND(40019, "session not found"),
    REFRESH_TOKEN_DOES_NOT_MATCH(40020, "Refresh token does not match"),
    OTP_IS_EXISTING(40021, "OTP is still valid. Please use the existing OTP."),

    FORBIDDEN(40003, "Forbidden"),

    GENRE_ALREADY_EXISTS(40022, "Genre already exists"),

    ADDRESS_NOT_FOUND(40023, "Adress not found"),
    CINEMA_ALREADY_EXISTS(40024, "CINEMA already exists"),
    INTERNAL_SERVER_ERROR(50000, "internal server error");

    private final int code;
    private final String message;
}
