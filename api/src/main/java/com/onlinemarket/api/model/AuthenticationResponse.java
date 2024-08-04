package com.onlinemarket.api.model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class AuthenticationResponse {
    private String token;
    private String username;
    private Role role;
    private String id;
}
