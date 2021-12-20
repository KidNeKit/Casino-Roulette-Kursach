package com.bsuir.mercury.controller;

import com.bsuir.mercury.entity.User;
import com.bsuir.mercury.service.BankService;
import com.bsuir.mercury.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/profile")
public class ProfileController {
    @Autowired
    private UserService userService;
    @Autowired
    private BankService bankService;

    @GetMapping
    public String profile(Model model){
        User currentUser = userService.getUserByLogin(SecurityContextHolder.getContext().getAuthentication().getName());
        model.addAttribute("balance", currentUser.getBalance());
        model.addAttribute("login", currentUser.getLogin());
        model.addAttribute("lastOperations", currentUser.getOperationSet());
        final Double[] total = {0.0};
        currentUser.getOperationSet().forEach(operation -> total[0] += operation.getSum());
        model.addAttribute("total", total[0]);
        model.addAttribute("totalBank", bankService.findBank().getSum() - 100000);
        return "profile";
    }
}
