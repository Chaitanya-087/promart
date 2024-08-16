package com.onlinemarket.api.binding;

import lombok.Data;

@Data
public class ProductRequest {
  private String name;
  private Double price;
  private String imageUrl;
  private Integer quantity;
  private String description;
  private String categoryName;
}
