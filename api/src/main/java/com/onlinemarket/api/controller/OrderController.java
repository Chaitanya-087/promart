package com.onlinemarket.api.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.onlinemarket.api.binding.OrderForm;
import com.onlinemarket.api.dto.MessageDTO;
import com.onlinemarket.api.dto.OrderDTO;
import com.onlinemarket.api.entity.Address;
import com.onlinemarket.api.entity.Order;
import com.onlinemarket.api.service.AddressService;
import com.onlinemarket.api.service.OrderService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/promart")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final AddressService addressService;

    @PostMapping("/orders")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Order> placeOrder(@RequestParam(name = "id") String userId, @RequestBody OrderForm orderForm) {
        Order order = orderService.placeOrder(orderForm,userId);
        return ResponseEntity.ok(order);
    }


    @GetMapping("/orders")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<OrderDTO>> getOrders(@RequestParam(name = "id") String userId) {
        return ResponseEntity.ok(orderService.getOrders(userId));
    }

    @PutMapping("/orders/cancel")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<MessageDTO> cancelOrder(@RequestParam Long id) {
        orderService.cancelOrder(id);
        return ResponseEntity.ok(new MessageDTO("Order cancelled successfully"));
    }

    @GetMapping("/address")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Address> getAddresses(@RequestParam(name = "id") String userId) {
        return ResponseEntity.ok(addressService.getAddress(userId));
    }

    @DeleteMapping("/orders")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<MessageDTO> deleteOrder(@RequestParam Long id) {
        orderService.deleteOrder(id);
        return ResponseEntity.ok(new MessageDTO("Order deleted successfully"));
    }
}
