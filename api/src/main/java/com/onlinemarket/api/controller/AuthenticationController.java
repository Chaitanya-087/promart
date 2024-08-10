package com.onlinemarket.api.controller;

import com.onlinemarket.api.binding.LoginRequest;
import com.onlinemarket.api.binding.SignupRequest;
import com.onlinemarket.api.dto.AuthenticationDTO;
import com.onlinemarket.api.dto.UserDTO;
import com.onlinemarket.api.entity.User;
import com.onlinemarket.api.service.AuthenticationService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthenticationController {

  private final AuthenticationService authService;

  @PostMapping("/register")
  public ResponseEntity<AuthenticationDTO> register(@RequestBody SignupRequest request) {
    return ResponseEntity.ok(authService.register(request));
  }

  @PostMapping("/login")
  public ResponseEntity<AuthenticationDTO> login(@RequestBody LoginRequest request) {
    return ResponseEntity.ok(authService.authenticate(request));
  }

  @GetMapping("/me")
  public ResponseEntity<UserDTO> me(@RequestParam String id) {
    User user = authService.getUser(id);
    return ResponseEntity.ok(
      UserDTO
        .builder()
        .id(user.getId())
        .username(user.getUsername())
        .email(user.getEmail())
        .build()
    );
  }
}
