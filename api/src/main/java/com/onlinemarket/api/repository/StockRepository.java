package com.onlinemarket.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.onlinemarket.api.entity.Stock;

public interface StockRepository extends JpaRepository<Stock, Long> {

}
