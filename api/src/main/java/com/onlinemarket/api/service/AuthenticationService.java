package com.onlinemarket.api.service;

import com.onlinemarket.api.entity.User;
import com.onlinemarket.api.model.AuthenticationResponse;
import com.onlinemarket.api.model.Role;
import com.onlinemarket.api.repository.UserRepository;

import java.util.Optional;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;

  public AuthenticationService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
    this.jwtService = jwtService;
    this.authenticationManager = authenticationManager;
  }

  public AuthenticationResponse register(User request) {
    User user = new User();
    user.setUsername(request.getUsername());
    user.setRole(Role.USER);
    user.setPassword(passwordEncoder.encode(request.getPassword()));
    userRepository.save(user);

    String token = jwtService.generateToken(user);
    return new AuthenticationResponse(token);
  }

  public AuthenticationResponse authenticate(User request) {
    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

    User user = userRepository.findByUsername(request.getUsername()).orElseThrow();
    String token = jwtService.generateToken(user);
    return new AuthenticationResponse(token);
  }

  public Optional<User> getUser(String id) {
    Optional<User> user = userRepository.findById(id);
    return user;
  }

}
