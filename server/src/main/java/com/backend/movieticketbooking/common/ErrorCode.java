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
    EMAIL_NOT_VERIFIED(40025, "email not verified"),
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

    ADDRESS_NOT_FOUND(40023, "Address not found"),
    CINEMA_ALREADY_EXISTS(40024, "CINEMA already exists"),
    CINEMA_NOT_FOUND(40025, "CINEMA not found"),

    INVALID_COUPLE_TYPE_SEAT_NUMBER(40026, "Invalid couple type seat number"),
    INVALID_STANDARD_TYPE_SEAT_NUMBER(40027, "Invalid standard type seat number"),
    INVALID_TOTAL_SEAT_NUMBER(40027, "Invalid total seat number"),

    INVALID_FORMAT_TIME(40028, "Invalid format time"),

    MOVIE_NOT_FOUND(40029, "Movie not found"),
    CINEMA_HALL_NOT_FOUND(40030, "CINEMA hall not found"),
    SHOW_ALREADY_EXISTS(40031, "A show already exists during this time period"),
    SHOW_NOT_FOUND(40032, "Show not found"),
    SHOW_IS_PLAYING_OR_IS_FINISHED(40033, "Show is playing or is finished"),

    SEAT_IS_HELD(40034, "Seat is held"),
    INTERNAL_SERVER_ERROR(50000, "internal server error");

    private final int code;
    private final String message;
}
