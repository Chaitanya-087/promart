package com.onlinemarket.api.model;

import lombok.Data;

@Data
public class SignupBody {

    private String username;
    private String email;
    private String password;
}
