package com.tekrewards.application.main.services;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserService implements UserDetailsService {
    @Value("${jwt.username}")
    private  String usernameToBeAuthenticated;

    @Value("${jwt.password}")
    private String passwordToBeAuthenticated;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if (usernameToBeAuthenticated.equals(username)) {
            return new User(usernameToBeAuthenticated,passwordToBeAuthenticated,
                    new ArrayList<>());
        } else {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
    }
}
