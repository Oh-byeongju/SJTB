package com.SJTB.project.base;

import com.SJTB.framework.data.ResultVo;
import com.SJTB.project.user.UserResponseDto;
import com.SJTB.project.user.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.time.LocalTime;
import java.util.HashMap;
import java.util.List;

@Controller
public class BaseController {
    @RequestMapping("/message/SSG")
    public ResponseEntity<HashMap<String, String>> SSG() {
        LocalTime now = LocalTime.now();
        HashMap<String, String> map = new HashMap<>();
        map.put("msg", "this is now SSG " + now.toString());

        System.out.println("SSG 요청" + now.toString());
        return ResponseEntity.ok().body(map);
    }

    @RequestMapping("/message/ISR")
    public ResponseEntity<HashMap<String, String>> ISR() {
        LocalTime now = LocalTime.now();
        HashMap<String, String> map = new HashMap<>();
        map.put("msg", "this is now ISR " + now.toString());

        System.out.println("ISR 요청" + now.toString());
        return ResponseEntity.ok().body(map);
    }

    @RequestMapping("/message/SSR")
    public ResponseEntity<HashMap<String, String>> SSR() {
        LocalTime now = LocalTime.now();
        HashMap<String, String> map = new HashMap<>();
        map.put("msg", "this is now SSR " + now.toString());

        System.out.println("SSR 요청" + now.toString());
        return ResponseEntity.ok().body(map);
    }
}
