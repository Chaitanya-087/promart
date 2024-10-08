package com.onlinemarket.api.configuration;

import com.onlinemarket.api.filter.JwtAuthenticationFilter;
import com.onlinemarket.api.handler.CustomAccessDeniedHandler;
import com.onlinemarket.api.service.CustomUserDetailService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

  private final CustomUserDetailService userDetailService;
  private final JwtAuthenticationFilter jwtAuthenticationFilter;
  private final CustomAccessDeniedHandler customAccessDeniedHandler;
  SecurityConfig(CustomUserDetailService userDetailService, JwtAuthenticationFilter jwtAuthenticationFilter, CustomAccessDeniedHandler customAccessDeniedHandler) {
    this.userDetailService = userDetailService;
    this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    this.customAccessDeniedHandler = customAccessDeniedHandler;
  }

  @Bean
  SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http.csrf(csrf -> csrf.disable());
    http.cors(cors -> cors.configurationSource(
      request -> {
          var corsConfiguration = new org.springframework.web.cors.CorsConfiguration();
          corsConfiguration.setAllowedOrigins(java.util.List.of("*"));
          corsConfiguration.setAllowedMethods(java.util.List.of("GET", "POST", "PUT", "DELETE"));
          corsConfiguration.setAllowedHeaders(java.util.List.of("*"));
          return corsConfiguration;
      }));
    http.authorizeHttpRequests(request ->
      request
        .requestMatchers("/api/v1/auth/login", "/api/v1/auth/register","/api/v1/auth/logout")
        .permitAll()
        .anyRequest()
        .authenticated()
    );
    http.userDetailsService(userDetailService);
    http.sessionManagement(session ->
      session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
    );
    http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
    http.exceptionHandling(e->e.accessDeniedHandler(customAccessDeniedHandler).authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)));
    return http.build();
  }

  @Bean
  PasswordEncoder passwordEncoder(){
    return new BCryptPasswordEncoder();
  }

  @Bean
  AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
    return configuration.getAuthenticationManager();
  }
}
