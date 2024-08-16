package com.onlinemarket.api.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CartItemDTO {

    private Long id;
    private Long productId;
    private String productName;
    private String imageUrl;
    private String categoryName;
    private String description;
    private Integer quantity;
    private Double price;
    private Double total;

    public Double getTotal() {
        return price * quantity;
    }

}
