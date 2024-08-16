package com.onlinemarket.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.onlinemarket.api.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserId(String userId);
}
