package com.newmes.cloud.domains.member.service;

import com.newmes.cloud.domains.member.domain.Member;
import com.newmes.cloud.domains.member.dto.MemberRequestDto;
import com.newmes.cloud.domains.member.entity.MemberEntity;
import com.newmes.cloud.domains.member.exception.InvalidPasswordException;
import com.newmes.cloud.domains.member.exception.MemberNotFoundException;
import com.newmes.cloud.domains.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberServiceImpl implements MemberService {

    private final AuthenticationManager authenticationManager;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional(readOnly = true)
    public void login(MemberRequestDto requestDto) {
        MemberEntity entity = memberRepository.findByUsername(requestDto.username())
                .orElseThrow(() -> new MemberNotFoundException(requestDto.username()));
        Member member = Member.fromEntity(entity);

        if (!passwordEncoder.matches(requestDto.password(), member.getPassword())) {
            throw new InvalidPasswordException();
        }


        List<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_"+member.getRole().name()));
        Authentication authToken = new UsernamePasswordAuthenticationToken(requestDto.username(), requestDto.password(), authorities);

        Authentication authentication = authenticationManager.authenticate(authToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);
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
        memberRepository.save(new MemberEntity(name,password));
    }
}
