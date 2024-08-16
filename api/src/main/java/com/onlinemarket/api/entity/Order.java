package com.onlinemarket.api.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.io.Serializable;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import lombok.Data;

import org.hibernate.annotations.CreationTimestamp;

@Data
@Entity
@Table(name = "orders")
public class Order implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(cascade = CascadeType.PERSIST,fetch=FetchType.LAZY, optional = false)
  @JoinColumn(name = "user_id")
  @JsonIgnore
  private User user;

  @OneToOne(cascade = CascadeType.PERSIST, optional = false)
  @JoinColumn(name = "bill_id")
  private Bill bill;

  @ManyToOne(optional = false)
  @JoinColumn(name = "shipping_address_id")
  private Address shippingAddress;

  @OneToMany(cascade = CascadeType.ALL,fetch = FetchType.EAGER, mappedBy = "order")
  @JsonIgnore
  private List<OrderItem> orderItems = new ArrayList<>();

  @CreationTimestamp
  private Date orderDate;

  @Column(name = "order_status")
  @Enumerated(value = EnumType.STRING)
  private OrderStatus orderStatus = OrderStatus.ORDERED;

  private Double orderAmount = 0.0;
}
