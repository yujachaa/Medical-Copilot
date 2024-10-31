package com.newmes.cloud.domains.member.controller;

import com.newmes.cloud.domains.member.service.MemberService;
import com.newmes.cloud.global.util.HttpResponseUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member")
public class MemberController {

    private final MemberService memberService;
    private final HttpResponseUtil responseUtil;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String username, @RequestParam String password) {
        memberService.login(username, password);
        return responseUtil.createSuccessResponse(200, "login success");
    }

    @GetMapping("/logout")
    public ResponseEntity<Map<String, Object>> logout(HttpServletRequest request) {
        memberService.logout(request);
        return responseUtil.createSuccessResponse(200, "logout success");
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestParam String username, @RequestParam String password) {
        memberService.signup(username, passwordEncoder.encode(password));
        return responseUtil.createSuccessResponse(200, "signup success");
    }
}
