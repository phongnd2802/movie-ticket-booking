package com.backend.movieticketbooking.enums;

public enum BookingStateEnum {
    PENDING,     // Đang giữ chỗ, chờ thanh toán (sau khi chọn ghế)
    CONFIRMED,   // Đã thanh toán thành công
    CANCELLED,   // Đã huỷ do timeout hoặc người dùng huỷ
    FAILED       // Thanh toán thất bại
}
