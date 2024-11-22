package com.newmes.cloud.domains.member.service;

import com.newmes.cloud.domains.member.dto.MemberRequestDto;
import jakarta.servlet.http.HttpServletRequest;

public interface MemberService {
    String login(MemberRequestDto requestDto);

    void logout(HttpServletRequest request);

    void signup(String name, String password);
}
