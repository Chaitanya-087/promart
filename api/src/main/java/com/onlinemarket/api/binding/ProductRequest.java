package com.onlinemarket.api.binding;

import lombok.Data;

@Data
public class ProductRequest {
  private String name;
  private String description;
  private Double price;
  private String imageUrl;
  private String categoryName;
  private Integer quantity;
}
