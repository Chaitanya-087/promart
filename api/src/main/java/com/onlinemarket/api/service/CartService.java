package com.onlinemarket.api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.onlinemarket.api.binding.CartItemRequest;
import com.onlinemarket.api.dto.CartItemDTO;
import com.onlinemarket.api.entity.Cart;
import com.onlinemarket.api.entity.CartItem;
import com.onlinemarket.api.entity.Product;
import com.onlinemarket.api.entity.User;
import com.onlinemarket.api.repository.CartItemRepository;
import com.onlinemarket.api.repository.CartRepository;
import com.onlinemarket.api.repository.ProductRepository;
import com.onlinemarket.api.repository.UserRepository;

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
    
        cartItem.setQuantity(cartItem.getQuantity() + request.getQuantity());
        cart.getItems().add(cartItem);
        cartRepository.save(cart);
        return cart;
    }
    
    public CartItem updateCartItem(Long id, CartItemRequest request) {
        CartItem cartItem = cartItemRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Cart item not found"));
    
        cartItem.setQuantity(request.getQuantity());
    
        cartItemRepository.save(cartItem);
        return cartItem;
    }

    public List<CartItemDTO> getCartItems(String userId) {
        Cart cart = cartRepository.findByUserId(userId).orElseThrow(
                () -> new IllegalArgumentException("Cart not found"));
        
        return cart.getItems().stream().map(this::mapToDTO).toList();
    }

    public void deleteCartItem(Long id) {
        cartItemRepository.deleteById(id);
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
