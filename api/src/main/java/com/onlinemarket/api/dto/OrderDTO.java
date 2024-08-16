package com.onlinemarket.api.dto;

import java.sql.Date;
import java.util.List;

import com.onlinemarket.api.entity.Address;
import com.onlinemarket.api.entity.Bill;
import com.onlinemarket.api.entity.OrderItem;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OrderDTO {
    private Long id;
    private Bill bill;
    private Address address;
    private String orderStatus;
    private Date orderDate;
    private Double orderAmount;
    private List<OrderItem> orderItems;
}
