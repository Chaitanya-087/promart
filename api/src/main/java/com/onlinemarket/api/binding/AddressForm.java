package com.onlinemarket.api.binding;

import lombok.Data;

@Data
public class AddressForm {

    private String fullAddress;
    private String city;
    private String state;
    private String pincode;
    private String phoneNumber;
}
