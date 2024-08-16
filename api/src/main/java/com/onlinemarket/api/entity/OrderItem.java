package com.onlinemarket.api.entity;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class OrderItem implements Serializable{

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(cascade = CascadeType.PERSIST,fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "order_id")
  @JsonIgnore
  private Order order;

  @ManyToOne(cascade = CascadeType.PERSIST, optional = false)
  @JoinColumn(name = "product_id")
  private Product product;

  private Integer quantity;

  private Double price;
}
