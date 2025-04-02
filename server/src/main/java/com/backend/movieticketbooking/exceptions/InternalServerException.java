package com.backend.movieticketbooking.exceptions;


import com.backend.movieticketbooking.common.ErrorCode;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;


@Getter
@ResponseStatus(value = HttpStatus.OK)
public class InternalServerException extends RuntimeException {
  private int code;

  public InternalServerException(String message) {
    super(message);
  }

  public InternalServerException(ErrorCode errorCode) {
    super(errorCode.getMessage());
    this.code = errorCode.getCode();
  }
}
