package com.bsuir.mercury.mvc;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/main")
public class MainController {

    @GetMapping("/roulette")
    public String roulette(){
        return "index";
    }

    @GetMapping("/table")
    public String table(){
        return "table";
    }
}
