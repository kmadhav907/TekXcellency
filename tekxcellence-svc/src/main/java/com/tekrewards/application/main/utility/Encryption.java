package com.tekrewards.application.main.utility;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.security.SecureRandom;

@Component
public class Encryption {
    private final Integer strength = 10;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(strength, new SecureRandom());

    public String encodePassword(String password){
        return passwordEncoder.encode(password);
    }
    public Boolean decodePassword(String password,String hashedPassword){
        return passwordEncoder.matches(password, hashedPassword);
    }
}
