package liuyuyang.net.web.controller;

import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.*;

@Api(tags = "首页")
@RestController
@RequestMapping("/")
public class HomeController {
    @GetMapping
    public String Home() {
        return "<h1>Hello ThriveX</h1>";
    }
}
