package com.onlinemarket.api.service;

import org.springframework.stereotype.Service;

import com.onlinemarket.api.binding.AddressForm;
import com.onlinemarket.api.entity.Address;
import com.onlinemarket.api.entity.User;
import com.onlinemarket.api.repository.AddressRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AddressService {

    private final AddressRepository addressRepository;

    public Address upsertAddress(AddressForm address, User user) {
        Address newAddress = addressRepository.findByUser(user).orElse(new Address());
        newAddress.setCity(address.getCity());
        newAddress.setPincode(address.getPincode());
        newAddress.setState(address.getState());
        newAddress.setFullAddress(address.getFullAddress());
        newAddress.setPhoneNumber(address.getPhoneNumber());
        newAddress.setUser(user);
        return addressRepository.save(newAddress);
    }
}
