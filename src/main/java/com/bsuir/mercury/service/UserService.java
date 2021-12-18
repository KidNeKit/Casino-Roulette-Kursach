package com.bsuir.mercury.service;

import com.bsuir.mercury.entity.Role;
import com.bsuir.mercury.entity.User;
import com.bsuir.mercury.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;

@Service
@Slf4j
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User createUser(User user) {
        String username = user.getUsername();
        User existingUser = getUserByLogin(username);
        if (existingUser != null) {
            //throw new UserAlreadyExistException("There is an account with login "+username);
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRoles(Collections.singleton(Role.USER));
        user.setBalance(0.0);
        user.setActive(true);
        return userRepository.save(user);
    }

    public User getUserByLogin(String login) {
        return userRepository.findUserByLogin(login);
    }

    public User patchUser(String login, HashMap<String, String> params){
        User user = userRepository.findUserByLogin(login);
        params.forEach((key, value) -> {
            if (key.equals("balance")){
                user.setBalance(Double.valueOf(value));
            }
        });
        return userRepository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String s) {
        User user = getUserByLogin(s);
        if (user == null) {
            log.error("Username not found exception {}", s);
            throw new UsernameNotFoundException("User not found: " + s);
        }
        return user;
    }
}
