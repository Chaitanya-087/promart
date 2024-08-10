package com.onlinemarket.api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.onlinemarket.api.binding.ProductRequest;
import com.onlinemarket.api.dto.ProductDTO;
import com.onlinemarket.api.entity.Category;
import com.onlinemarket.api.entity.Product;
import com.onlinemarket.api.entity.Stock;
import com.onlinemarket.api.repository.CategoryRepository;
import com.onlinemarket.api.repository.ProductRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    
    @Transactional
    public List<ProductDTO> getProducts() {
        return productRepository.findAll().stream()
            .map(this::mapToDTO)
            .toList();
    }

    @Transactional
    public List<ProductDTO> getAvailableProducts() {
        return productRepository.findByStockQuantityGreaterThanEqual(1).stream()
            .map(this::mapToDTO)
            .toList();
    }

    @Transactional
    public ProductDTO updateProduct(Long id, ProductRequest request) {
        Product product = productRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Product not found"));

        if (request.getName() != null) product.setName(request.getName());
        if (request.getDescription() != null) product.setDescription(request.getDescription());
        if (request.getPrice() != null) product.setPrice(request.getPrice());
        if (request.getImageUrl() != null) product.setImageUrl(request.getImageUrl());

        if (request.getQuantity() != null) {
            Stock stock = product.getStock();
            if (stock == null) {
                stock = new Stock();
                stock.setProduct(product);
                product.setStock(stock);
            }
            stock.setQuantity(request.getQuantity());
        }

        if (request.getCategoryName() != null) {
            Category category = categoryRepository.findByName(request.getCategoryName())
                .orElseGet(() -> {
                    Category newCategory = new Category();
                    newCategory.setName(request.getCategoryName());
                    categoryRepository.save(newCategory); 
                    return newCategory;
                });
            product.setCategory(category);
        }

        productRepository.save(product);
        return mapToDTO(product);
    }

    @Transactional
    public ProductDTO addProduct(ProductRequest request) {
        Product product = new Product();
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setImageUrl(request.getImageUrl());
    
        Category category = categoryRepository.findByName(request.getCategoryName())
            .orElseGet(() -> {
                Category newCategory = new Category();
                newCategory.setName(request.getCategoryName());
                return categoryRepository.save(newCategory);  // Save and return the new category
            });
        product.setCategory(category);
    
        Stock stock = new Stock();
        stock.setQuantity(request.getQuantity());
        stock.setProduct(product);
        product.setStock(stock);
    
        productRepository.save(product);
    
        return mapToDTO(product);
    }
    

    @Transactional
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    private ProductDTO mapToDTO(Product product) {
        return ProductDTO.builder()
            .id(product.getId())
            .name(product.getName())
            .description(product.getDescription())
            .price(product.getPrice())
            .categoryId(product.getCategory().getId())
            .imageUrl(product.getImageUrl())
            .build();
    }

}
