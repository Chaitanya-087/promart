package com.onlinemarket.api.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.onlinemarket.api.entity.Product;


@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByStockQuantityGreaterThanEqual(Integer quantity);
    Optional<Product> findByName(String name);
}
