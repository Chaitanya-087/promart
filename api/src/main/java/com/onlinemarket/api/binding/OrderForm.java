package com.onlinemarket.api.binding;

import java.util.List;

import lombok.Data;

@Data
public class OrderForm {
    private List<Long> cartItemIds;
    private AddressForm address;
    private String paymentMethod;
}
