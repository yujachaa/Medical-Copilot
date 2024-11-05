package com.newmes.onpremise.domains.member.service;

import com.newmes.onpremise.domains.member.domain.Member;
import com.newmes.onpremise.domains.member.domain.Token;
import com.newmes.onpremise.domains.member.dto.request.LoginRequestDto;
import com.newmes.onpremise.domains.member.dto.request.MemberRequestDto;
import com.newmes.onpremise.domains.member.dto.response.LoginResponseDto;
import com.newmes.onpremise.domains.member.dto.response.MemberResponseDto;
import com.newmes.onpremise.domains.member.entity.MemberEntity;

public interface MemberService {

    LoginResponseDto login(LoginRequestDto request);

    void logout(Token token);

    MemberResponseDto signup(MemberRequestDto requestDto);

    MemberResponseDto update(MemberRequestDto request);

    void updatePassword(String password);

    MemberEntity getMember();

    Member getMemberByEmail(String email);
}
