package com.onlinemarket.api.service;

import java.util.List;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.onlinemarket.api.binding.OrderForm;
import com.onlinemarket.api.dto.OrderDTO;
import com.onlinemarket.api.entity.Address;
import com.onlinemarket.api.entity.Bill;
import com.onlinemarket.api.entity.CartItem;
import com.onlinemarket.api.entity.Order;
import com.onlinemarket.api.entity.OrderItem;
import com.onlinemarket.api.entity.Product;
import com.onlinemarket.api.entity.User;
import com.onlinemarket.api.repository.CartItemRepository;
import com.onlinemarket.api.repository.OrderRepository;
import com.onlinemarket.api.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;
    private final AddressService addressService;

    @Transactional
    public Order placeOrder(OrderForm order,String userId) {
        List<CartItem> cartItems = cartItemRepository.findByIdIn(order.getCartItemIds()); 
        User user = userRepository.findById(userId).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        Address address = addressService.upsertAddress(order.getAddress(), user);
    
        // Create a new bill
        Bill bill = new Bill();
        bill.setPaymentMethod(order.getPaymentMethod());
        bill.setUser(user);

        // Create a new order
        Order newOrder = new Order();
        newOrder.setUser(user);
        newOrder.setShippingAddress(address);
        newOrder.setBill(bill);

        // Calculate the total amount
        double amount = cartItems.stream().mapToDouble(cartItem -> cartItem.getProduct().getPrice() * cartItem.getQuantity()).sum();
        
        // Create order items
        cartItems.forEach(cartItem -> {
            OrderItem oi = new OrderItem();
            Product product = cartItem.getProduct();
            oi.setProduct(product);
            oi.setQuantity(cartItem.getQuantity());
            oi.setPrice(product.getPrice() * cartItem.getQuantity());
            oi.setOrder(newOrder);
            newOrder.getOrderItems().add(oi);
        });
        bill.setPaymentAmount(amount);
        newOrder.setOrderAmount(amount);
        cartItems.forEach(cartItem -> cartItemRepository.delete(cartItem));

        return orderRepository.save(newOrder);
    }

    public List<OrderDTO> getOrders(String userId) {
        return orderRepository.findByUserId(userId).stream().map(this::mapToDTO).toList();
    }

    private OrderDTO mapToDTO(Order order) {
        return OrderDTO.builder()
                .id(order.getId())
                .bill(order.getBill())
                .address(order.getShippingAddress())
                .orderStatus(order.getOrderStatus().name())
                .orderDate(order.getOrderDate())
                .orderAmount(order.getOrderAmount())
                .orderItems(order.getOrderItems())
                .build();
    }
}
