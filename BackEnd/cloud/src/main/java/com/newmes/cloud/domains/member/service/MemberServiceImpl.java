package com.newmes.cloud.domains.member.service;

import com.newmes.cloud.domains.member.domain.Member;
import com.newmes.cloud.domains.member.dto.MemberRequestDto;
import com.newmes.cloud.domains.member.entity.MemberEntity;
import com.newmes.cloud.domains.member.exception.InvalidPasswordException;
import com.newmes.cloud.domains.member.exception.MemberNotFoundException;
import com.newmes.cloud.domains.member.repository.MemberRepository;
import com.newmes.cloud.global.security.jwt.JwtUtil;
import com.newmes.cloud.global.security.userdetails.CustomUserInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Transactional(readOnly = true)
    public String login(MemberRequestDto requestDto) {
        MemberEntity entity = memberRepository.findByUsername(requestDto.username())
                .orElseThrow(() -> new MemberNotFoundException(requestDto.username()));
        Member member = Member.fromEntity(entity);

        if (!passwordEncoder.matches(requestDto.password(), member.getPassword())) {
            throw new InvalidPasswordException();
        }

        CustomUserInfo userInfo = new CustomUserInfo(member.getId(), member.getUsername(),"", member.getRole());

        String accessToken = jwtUtil.createAccessToken(userInfo);

        return accessToken;
    }

    public void logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        SecurityContextHolder.clearContext();
    }

    @Override
    @Transactional
    public void signup(String name, String password) {
        String encodedPassword = passwordEncoder.encode(password);
        memberRepository.save(new MemberEntity(name, encodedPassword));
    }
}
