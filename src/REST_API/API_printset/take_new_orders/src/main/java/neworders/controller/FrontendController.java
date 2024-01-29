package neworders.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FrontendController {
    @GetMapping(value = "/")
    @CrossOrigin(origins = "http://localhost:3000")
    public String home(){
        return "index.html";
    }
}
