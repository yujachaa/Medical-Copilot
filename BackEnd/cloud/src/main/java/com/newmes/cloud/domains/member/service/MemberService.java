package com.newmes.cloud.domains.member.service;

import jakarta.servlet.http.HttpServletRequest;

public interface MemberService {
    void login(String name, String password);

    void logout(HttpServletRequest request);

    void signup(String name, String password);
}
