package com.onlinemarket.api.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/api/v1/promart")
public class ProductController {

    @GetMapping("/greet")
    public String getMethodName() {
        return "Hello World";
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin")
    public String getMethodName2() {
        return "Hello Admin";
    }
    
}
