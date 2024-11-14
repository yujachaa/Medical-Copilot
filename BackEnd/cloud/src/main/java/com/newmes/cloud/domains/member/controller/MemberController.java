package com.newmes.cloud.domains.member.controller;

import com.newmes.cloud.domains.member.dto.MemberRequestDto;
import com.newmes.cloud.domains.member.exception.MemberNotFoundException;
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
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;
    private final HttpResponseUtil responseUtil;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody MemberRequestDto requestDto) {
        try {
            String token = memberService.login(requestDto);
            return responseUtil.createResponse(token);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        try {
            memberService.logout(request);
            return responseUtil.createSuccessResponse(200, "logout success");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody MemberRequestDto requestDto) {
        try {
            memberService.signup(requestDto.username(), passwordEncoder.encode(requestDto.password()));
            return responseUtil.createSuccessResponse(200, "signup success");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
