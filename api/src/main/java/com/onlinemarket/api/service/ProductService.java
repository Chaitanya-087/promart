package com.onlinemarket.api.service;

import com.onlinemarket.api.binding.ProductRequest;
import com.onlinemarket.api.dto.CategoryDTO;
import com.onlinemarket.api.dto.ProductDTO;
import com.onlinemarket.api.entity.Category;
import com.onlinemarket.api.entity.Product;
import com.onlinemarket.api.entity.Stock;
import com.onlinemarket.api.repository.CategoryRepository;
import com.onlinemarket.api.repository.ProductRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductService {

  private final ProductRepository productRepository;
  private final CategoryRepository categoryRepository;

  @Transactional
  public List<ProductDTO> getProducts() {
    return productRepository.findAll().stream().map(this::mapToDTO).toList();
  }

  @Transactional
  public List<ProductDTO> getAvailableProducts() {
    return productRepository
      .findByStockQuantityGreaterThanEqual(1)
      .stream()
      .map(this::mapToDTO)
      .toList();
  }

  @Transactional
  public ProductDTO updateProduct(Long id, ProductRequest request) {
    Product product = productRepository
      .findById(id)
      .orElseThrow(() -> new IllegalArgumentException("Product not found"));

    if (request.getName() != null) product.setName(request.getName());
    if (request.getDescription() != null) product.setDescription(
      request.getDescription()
    );
    if (request.getPrice() != null) product.setPrice(request.getPrice());
    if (request.getImageUrl() != null) product.setImageUrl(
      request.getImageUrl()
    );
    if (request.getQuantity() != null) {
      Stock stock = product.getStock();
      stock.setQuantity(request.getQuantity());
    }
    if (request.getCategoryName() != null) {
      Category category = categoryRepository
        .findByName(request.getCategoryName())
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

    Category category = categoryRepository
      .findByName(request.getCategoryName().toLowerCase())
      .orElseGet(() -> {
        Category newCategory = new Category();
        newCategory.setName(request.getCategoryName());
        return categoryRepository.save(newCategory);
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
  public List<CategoryDTO> getCategories() {
    return categoryRepository.findAllCategoryDTOs();
  }

  @Transactional
  public void deleteProduct(Long id) {
    productRepository.deleteById(id);
  }

  private ProductDTO mapToDTO(Product product) {
    return ProductDTO
      .builder()
      .id(product.getId())
      .name(product.getName())
      .description(product.getDescription())
      .price(product.getPrice())
      .categoryName(product.getCategory().getName())
      .imageUrl(product.getImageUrl())
      .quantity(product.getStock().getQuantity())
      .build();
  }
}
