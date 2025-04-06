package com.backend.movieticketbooking.exceptions;


import com.backend.movieticketbooking.common.ErrorCode;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@Getter
@ResponseStatus(HttpStatus.OK)
public class NotFoundException extends RuntimeException {
    private int code;

    public NotFoundException(String message) {
        super(message);
    }

    public NotFoundException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.code = errorCode.getCode();
    }

}
