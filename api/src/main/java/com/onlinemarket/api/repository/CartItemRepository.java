package com.onlinemarket.api.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.onlinemarket.api.entity.Cart;
import com.onlinemarket.api.entity.CartItem;
import com.onlinemarket.api.entity.Product;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByCart(Cart cart);
    Optional<CartItem> findByProductAndCart(Product product, Cart cart);
    Optional<CartItem> findById(Long id);

    List<CartItem> findByIdIn(List<Long> ids);
}
