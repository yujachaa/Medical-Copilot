package com.newmes.cloud.domains.member.service;

import com.newmes.cloud.domains.member.domain.Member;
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

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberServiceImpl implements MemberService {

    private final AuthenticationManager authenticationManager;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public void login(String name, String password) {
        MemberEntity entity = memberRepository.findByUsername(name)
                .orElseThrow(() -> new MemberNotFoundException(name));
        Member member = Member.fromEntity(entity);

        if (!passwordEncoder.matches(password, member.getPassword())) {
            log.info("{}, {}", password, member.getPassword());
            throw new InvalidPasswordException();
        }

        Authentication authToken = new UsernamePasswordAuthenticationToken(name, password);
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
    public void signup(String name, String password) {
        memberRepository.save(new MemberEntity(name,passwordEncoder.encode(password)));
    }
}
