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

import com.onlinemarket.api.binding.CartItemRequest;
import com.onlinemarket.api.dto.CartItemDTO;
import com.onlinemarket.api.dto.MessageDTO;
import com.onlinemarket.api.service.CartService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/promart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/cart")
    public ResponseEntity<MessageDTO> addToCart(@RequestBody CartItemRequest request) {
        cartService.addToCart(request);
        return ResponseEntity.ok(new MessageDTO("Item added to cart successfully"));
    }

    @PreAuthorize("hasRole('USER')")
    @PutMapping("/cart")
    public ResponseEntity<MessageDTO> updateCartItem(@RequestParam Long id, @RequestBody CartItemRequest request) {
        cartService.updateCartItem(id, request);
        return ResponseEntity.ok(new MessageDTO("Cart item updated successfully"));
    }

    @PreAuthorize("hasRole('USER')")
    @DeleteMapping("/cart")
    public ResponseEntity<MessageDTO> deleteCartItem(@RequestParam Long id) {
        cartService.deleteCartItem(id);
        return ResponseEntity.ok(new MessageDTO("Cart item deleted successfully"));
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/cart")
    public ResponseEntity<List<CartItemDTO>> getCartItems(@RequestParam String id) {
        return ResponseEntity.ok(cartService.getCartItems(id));
    }
}
