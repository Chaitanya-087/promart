package com.onlinemarket.api.controller;

import com.onlinemarket.api.dto.UserDTO;
import com.onlinemarket.api.entity.User;
import com.onlinemarket.api.model.AuthenticationResponse;
import com.onlinemarket.api.model.LoginBody;
import com.onlinemarket.api.model.SignupBody;
import com.onlinemarket.api.service.AuthenticationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthenticationController {

  private final AuthenticationService authService;

  public AuthenticationController(AuthenticationService authService) {
    this.authService = authService;
  }

  @PostMapping("/register")
  public ResponseEntity<AuthenticationResponse> register(
    @RequestBody SignupBody request
  ) {
    return ResponseEntity.ok(authService.register(request));
  }

  @PostMapping("/login")
  public ResponseEntity<AuthenticationResponse> login(
    @RequestBody LoginBody request
  ) {
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
