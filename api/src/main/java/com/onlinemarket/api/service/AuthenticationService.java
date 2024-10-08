package com.onlinemarket.api.service;

import com.onlinemarket.api.binding.LoginRequest;
import com.onlinemarket.api.binding.SignupRequest;
import com.onlinemarket.api.dto.AuthenticationDTO;
import com.onlinemarket.api.entity.Role;
import com.onlinemarket.api.entity.User;
import com.onlinemarket.api.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import java.util.Optional;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;

  public AuthenticationDTO register(SignupRequest request) {
    if (
      userRepository.existsByUsername(request.getUsername()) ||
      userRepository.existsByEmail(request.getEmail())
    ) {
      throw new IllegalArgumentException("Username or email already exists");
    }

    User user = new User();
    user.setUsername(request.getUsername());
    user.setRole(Role.USER);
    user.setEmail(request.getEmail());
    user.setPassword(passwordEncoder.encode(request.getPassword()));

    userRepository.save(user);

    String token = jwtService.generateToken(user);
    return new AuthenticationDTO(token);
  }

  public AuthenticationDTO authenticate(LoginRequest request) {
    String username = request.getUsername();
    Optional<User> userOpt = userRepository.findByUsername(username);

    if (!userOpt.isPresent()) {
      userOpt = userRepository.findByEmail(username);
      if (userOpt.isPresent()) {
        username = userOpt.get().getUsername();
      } else {
        throw new BadCredentialsException("Invalid username or email");
      }
    }

    try {
      authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(username, request.getPassword())
      );
    } catch (AuthenticationException e) {
      throw new BadCredentialsException("Invalid username or password");
    }

    User user = userOpt.get();
    String token = jwtService.generateToken(user);
    return new AuthenticationDTO(token);
  }

  public User getUser(String id) {
    Optional<User> user = userRepository.findById(id);
    if (user.isEmpty()) {
      throw new UsernameNotFoundException("User not found");
    }
    return user.get();
  }
}
