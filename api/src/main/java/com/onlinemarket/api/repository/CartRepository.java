package com.onlinemarket.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.onlinemarket.api.entity.Cart;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByUserId(String userId);

    void deleteByUserId(String userId);
}
