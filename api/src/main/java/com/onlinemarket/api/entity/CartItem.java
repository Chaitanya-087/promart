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
public class CartItem implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer quantity = 0;

    @ManyToOne(optional = false,cascade = CascadeType.PERSIST,fetch = FetchType.EAGER)
    @JoinColumn(name="product_id")
    @JsonIgnore
    private Product product;

    @ManyToOne(optional = false,cascade = CascadeType.PERSIST,fetch = FetchType.LAZY)
    @JoinColumn(name="cart_id")
    @JsonIgnore
    private Cart cart;
}
