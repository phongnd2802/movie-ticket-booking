package com.backend.movieticketbooking.dtos.auth.request;


import jakarta.validation.constraints.*;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RegisterRequest {

    @NotBlank(message = "userName is required")
    private String userName;

    @NotBlank(message = "userEmail is required")
    @Email(message = "invalid email format")
    private String userEmail;

    @NotBlank(message = "userPassword is required")
    @Size(min=6, message = "password must be at least 6 characters length")
    private String userPassword;

    @NotBlank(message = "userMobile is required")
    @Pattern(regexp = "^[0-9]{10}$", message = "userMobile must be 10 digits")
    private String userMobile;

    @NotNull(message = "userGender is required")
    private boolean userGender;

    @NotBlank(message = "userBirthday is required")
    @Pattern(regexp = "^\\d{4}-\\d{2}-\\d{2}$", message = "userBirthday must be in yyyy-MM-dd format")
    private String userBirthday;
}
