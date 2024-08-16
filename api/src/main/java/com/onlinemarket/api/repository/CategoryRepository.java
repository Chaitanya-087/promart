package com.onlinemarket.api.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.onlinemarket.api.dto.CategoryDTO;
import com.onlinemarket.api.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findByName(String name);

    @Query("SELECT new com.onlinemarket.api.dto.CategoryDTO(c.id, c.name) FROM Category c")
    List<CategoryDTO> findAllCategoryDTOs();
    
    Boolean existsByName(String name);
}
