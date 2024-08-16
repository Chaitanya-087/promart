package com.onlinemarket.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {

  private Long id;
  private String name;
  private Double price;
  private String imageUrl;
  private Integer quantity;
  private String categoryName;
  private String description;

}
