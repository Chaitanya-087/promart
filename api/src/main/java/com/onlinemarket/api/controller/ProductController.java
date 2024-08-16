package com.onlinemarket.api.controller;

import org.springframework.web.bind.annotation.RestController;

import com.onlinemarket.api.binding.ProductRequest;
import com.onlinemarket.api.dto.CategoryDTO;
import com.onlinemarket.api.dto.MessageDTO;
import com.onlinemarket.api.dto.ProductDTO;
import com.onlinemarket.api.service.ProductService;

import lombok.RequiredArgsConstructor;

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

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/promart")
public class ProductController {
    private final ProductService productService;

    @PostMapping("/products")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ProductDTO> addProduct(@RequestBody ProductRequest request) {
        return ResponseEntity.ok(productService.addProduct(request));
    }
    
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/products")
    public List<ProductDTO> getProducts() {
        return productService.getProducts();
    }

    @GetMapping("/products/available")
    public List<ProductDTO> getAvailableProducts() {
        return productService.getAvailableProducts();
    }

    @PutMapping("/products")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ProductDTO>updateProduct(@RequestParam Long id, @RequestBody ProductRequest request) {
        return ResponseEntity.ok(productService.updateProduct(id, request));
    }

    @DeleteMapping("/products")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<MessageDTO> deleteProduct(@RequestParam Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok(new MessageDTO("Product deleted successfully"));
    }

    @GetMapping("/categories")
    public ResponseEntity<List<CategoryDTO>> getCategories() {
        return ResponseEntity.ok(productService.getCategories());
    }

}
