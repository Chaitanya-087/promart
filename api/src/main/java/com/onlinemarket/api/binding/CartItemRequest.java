package com.onlinemarket.api.binding;

import lombok.Data;

@Data
public class CartItemRequest {

    private String userId;
    private Long productId;
    private Integer quantity;
}
