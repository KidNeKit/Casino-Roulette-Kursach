package com.bsuir.mercury.controller;

import com.bsuir.mercury.entity.User;
import com.bsuir.mercury.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/roulette")
public class MainController {
    @Autowired
    private UserService userService;

    @GetMapping
    public String roulette(Model model){
        User currentUser = userService.getUserByLogin(SecurityContextHolder.getContext().getAuthentication().getName());
        model.addAttribute("balance", currentUser.getBalance());
        model.addAttribute("login", currentUser.getLogin());
        return "roulette";
    }
}
