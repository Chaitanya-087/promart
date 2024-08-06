package com.onlinemarket.api.handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.onlinemarket.api.model.ErrorResponse;

@ControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(IllegalArgumentException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public ResponseEntity<ErrorResponse> handleIllegalArgumentException(
    IllegalArgumentException e
  ) {
    return new ResponseEntity<ErrorResponse>(
      ErrorResponse.builder().status(HttpStatus.BAD_REQUEST.value()).message(e.getMessage()).build(),
      HttpStatus.BAD_REQUEST
    );
  }

  @ExceptionHandler(BadCredentialsException.class)
  @ResponseStatus(HttpStatus.UNAUTHORIZED)
  public ResponseEntity<ErrorResponse> handleBadCredentialsException(
    BadCredentialsException e
  ) {
    return new ResponseEntity<ErrorResponse>(
        ErrorResponse.builder().status(HttpStatus.UNAUTHORIZED.value()).message(e.getMessage()).build(),
        HttpStatus.UNAUTHORIZED
    );
  }

  @ExceptionHandler(UsernameNotFoundException.class)
  @ResponseStatus(HttpStatus.NOT_FOUND)
  public ResponseEntity<ErrorResponse> handleUsernameNotFoundException(
    UsernameNotFoundException e
  ) {
    return new ResponseEntity<ErrorResponse>(
        ErrorResponse.builder().status(HttpStatus.NOT_FOUND.value()).message(e.getMessage()).build(),
        HttpStatus.NOT_FOUND
    );
  }
}
