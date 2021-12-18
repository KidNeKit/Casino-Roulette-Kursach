package com.bsuir.mercury.controller.rest;

import com.bsuir.mercury.entity.User;
import com.bsuir.mercury.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("/api/user")
public class UserRestController {

    @Autowired
    private UserService userService;

    @PatchMapping("{login}")
    public User patchUser(@PathVariable String login, @RequestBody HashMap<String, String> params){
        return userService.patchUser(login, params);
    }
}
