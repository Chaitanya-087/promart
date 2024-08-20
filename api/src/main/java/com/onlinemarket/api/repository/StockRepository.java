package com.onlinemarket.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.onlinemarket.api.entity.Product;
import com.onlinemarket.api.entity.Stock;

public interface StockRepository extends JpaRepository<Stock, Long> {
    Optional<Stock> findByProduct(Product product);
}
