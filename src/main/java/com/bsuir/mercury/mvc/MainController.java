package com.bsuir.mercury.mvc;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/roulette")
public class MainController {

    @GetMapping
    public String roulette(){
        return "roulette";
    }
}
