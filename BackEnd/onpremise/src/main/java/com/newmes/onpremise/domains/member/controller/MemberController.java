package com.newmes.onpremise.domains.member.controller;

import com.newmes.onpremise.domains.member.domain.Token;
import com.newmes.onpremise.domains.member.dto.request.LoginRequestDto;
import com.newmes.onpremise.domains.member.dto.request.MemberRequestDto;
import com.newmes.onpremise.domains.member.dto.response.LoginResponseDto;
import com.newmes.onpremise.domains.member.dto.response.MemberResponseDto;
import com.newmes.onpremise.domains.member.service.MemberService;
import com.newmes.onpremise.global.util.HttpResponseUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final HttpResponseUtil httpResponseUtil;

    @PostMapping("/signup")
    public ResponseEntity<Map<String, Object>> signup(@RequestBody MemberRequestDto requestDto) {
        MemberResponseDto response = memberService.signup(requestDto);
        return httpResponseUtil.createSuccessResponse("success", response);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequestDto requestDto) {
        LoginResponseDto response = memberService.login(requestDto);
        return httpResponseUtil.createSuccessResponse("success", response);
    }

    @PostMapping("/logout")
    public ResponseEntity<Map<String, Object>> logout(@RequestBody Token token) {
        memberService.logout(token);
        return httpResponseUtil.createSuccessResponse("success", HttpStatus.OK);
    }

    @PatchMapping("/update")
    public ResponseEntity<Map<String, Object>> update(@RequestBody MemberRequestDto requestDto) {
        var updatedMember = memberService.update(requestDto);
        return httpResponseUtil.createResponse(updatedMember);
    }

    @PatchMapping("/update-password")
    public ResponseEntity<Map<String, Object>> updatePassword(@RequestBody String password) {
        memberService.updatePassword(password);
        return httpResponseUtil.createSuccessResponse("success", HttpStatus.OK);
    }
}
