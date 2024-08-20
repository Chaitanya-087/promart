package com.onlinemarket.api.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.onlinemarket.api.binding.CartItemRequest;
import com.onlinemarket.api.controller.exception.InsufficientStockException;
import com.onlinemarket.api.dto.CartItemDTO;
import com.onlinemarket.api.entity.Cart;
import com.onlinemarket.api.entity.CartItem;
import com.onlinemarket.api.entity.Product;
import com.onlinemarket.api.entity.Stock;
import com.onlinemarket.api.entity.User;
import com.onlinemarket.api.repository.CartItemRepository;
import com.onlinemarket.api.repository.CartRepository;
import com.onlinemarket.api.repository.ProductRepository;
import com.onlinemarket.api.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CartService {
    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final CartItemRepository cartItemRepository;

    public Cart addToCart(CartItemRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));

        Stock stock = product.getStock();
    
        Cart cart = cartRepository.findByUserId(request.getUserId())
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUser(user);
                    return newCart;
                });
    
        CartItem cartItem = cart.getItems().stream().
                filter(item -> item.getProduct().getId().equals(product.getId()))
                .findFirst()
                .orElseGet(() -> {
                    CartItem newItem = new CartItem();
                    newItem.setProduct(product);
                    newItem.setCart(cart);
                    return newItem;
                });

        if (stock.getQuantity() < request.getQuantity()) {
            throw new InsufficientStockException("Insufficient stock");
        }
        cartItem.setQuantity(cartItem.getQuantity() + request.getQuantity());
        cart.getItems().add(cartItem);
        cartRepository.save(cart);
        return cart;
    }
    
    public CartItem updateCartItem(Long id, CartItemRequest request) {
        CartItem cartItem = cartItemRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Cart item not found"));
        Stock stock = cartItem.getProduct().getStock();
        if (stock.getQuantity() < request.getQuantity() + cartItem.getQuantity()) {
            throw new InsufficientStockException("Insufficient stock");
        }
        cartItem.setQuantity(request.getQuantity());
    
        cartItemRepository.save(cartItem);
        return cartItem;
    }

    public List<CartItemDTO> getCartItems(String userId) {
        Optional<Cart> cartOpty = cartRepository.findByUserId(userId)
                .or(() -> Optional.of(new Cart()));
        Cart cart = cartOpty.get();
        return cart.getItems().stream().map(this::mapToDTO).toList();
    }

    @Transactional
    public void deleteCartItem(Long id) {
        cartItemRepository.deleteById(id);
    }

    @Transactional
    public void deleteCart(String userId) {
        cartRepository.deleteByUserId(userId);
    }

    private CartItemDTO mapToDTO(CartItem item) {
        return CartItemDTO.builder()
                .id(item.getId())
                .productId(item.getProduct().getId())
                .productName(item.getProduct().getName())
                .quantity(item.getQuantity())
                .categoryName(item.getProduct().getCategory().getName())
                .description(item.getProduct().getDescription())
                .imageUrl(item.getProduct().getImageUrl())
                .price(item.getProduct().getPrice())
                .build();
    }
}
