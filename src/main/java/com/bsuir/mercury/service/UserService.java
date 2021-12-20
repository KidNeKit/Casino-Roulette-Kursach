package com.bsuir.mercury.service;

import com.bsuir.mercury.entity.*;
import com.bsuir.mercury.entity.Number;
import com.bsuir.mercury.repository.OperationRepository;
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

@Service
@Slf4j
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final OperationRepository operationRepository;
    private final BankService bankService;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, OperationRepository operationRepository, BankService bankService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.operationRepository = operationRepository;
        this.bankService = bankService;
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
        Operation operation = new Operation();
        operation.setUser(user);
        bankService.createBankIfNotExists();
        CasinoBank casinoBank = bankService.findBank();
        params.forEach((key, value) -> {
            switch (key) {
                case "win":
                    Double win = Double.valueOf(value);
                    operation.setSum(win);
                    user.setBalance(user.getBalance() + win);
                    casinoBank.setSum(casinoBank.getSum() - win);
                    break;
                case "number":
                    operation.setNumber(Integer.parseInt(value));
                    operation.setColor(Number.getColorByNumber(Integer.parseInt(value)));
                    break;
                default:
                    log.info("Unknown key");
                    break;
            }
        });
        bankService.saveBank(casinoBank);
        operationRepository.save(operation);
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
