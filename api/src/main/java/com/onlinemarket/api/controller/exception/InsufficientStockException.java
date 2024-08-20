package com.onlinemarket.api.controller.exception;



public class InsufficientStockException extends RuntimeException{

    public InsufficientStockException(String message) {
        super(message);
    }
}
