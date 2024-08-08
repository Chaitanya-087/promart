package com.onlinemarket.api.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name="users")
@AllArgsConstructor
@NoArgsConstructor
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;

  @Column(nullable = false, unique = true, name = "username")
  private String username;

  @Column(nullable = false, name = "password")
  private String password;

  @Column(nullable = false, unique = true, name = "email")
  private String email;

  @Column(name = "role")
  @Enumerated(value=EnumType.STRING)
  private Role role = Role.USER;
}
