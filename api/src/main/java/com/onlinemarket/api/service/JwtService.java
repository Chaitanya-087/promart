package com.onlinemarket.api.service;

import com.onlinemarket.api.entity.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.util.Date;
import java.util.function.Function;
import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class JwtService {

  @Value("${spring.security.jwt.secret}")
  private String secretKey;

  @Value("${spring.security.jwt.expiration}")
  private Long expiration;

  public <T> T extractClaim(String token, Function<Claims, T> resolver) {
    Claims claims = extractAllClaims(token);
    return resolver.apply(claims);
  }

  public String extractUsername(String token) {
    return extractClaim(token, Claims::getSubject);
  }

  public Boolean isValid(String token, UserDetails user) {
    final String username = extractUsername(token);
    return username.equals(user.getUsername()) && !isTokenExpired(token);
  }

  private Boolean isTokenExpired(String token) {
    return extractExpiration(token).before(new Date());
  }

  private Date extractExpiration(String token) {
    return extractClaim(token, Claims::getExpiration);
  }

  private Claims extractAllClaims(String token) {
    return Jwts
      .parser()
      .verifyWith(getSigninKey())
      .build()
      .parseSignedClaims(token)
      .getPayload();
  }

  public String generateToken(User user) {
    String token = Jwts
      .builder()
      .subject(user.getUsername())
      .claim("role", user.getRole())
      .claim("uid", user.getId())
      .issuedAt(new Date(System.currentTimeMillis()))
      .expiration(new Date(System.currentTimeMillis() + this.expiration))
      .signWith(getSigninKey())
      .compact();

    return token;
  }

  private SecretKey getSigninKey() {
    byte[] keyBytes = Decoders.BASE64URL.decode(this.secretKey);
    return Keys.hmacShaKeyFor(keyBytes);
  }
}
