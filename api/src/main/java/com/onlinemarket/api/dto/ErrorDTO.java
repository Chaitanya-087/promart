package com.onlinemarket.api.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ErrorDTO {
    private int status;
    private String message;
}
