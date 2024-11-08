package com.newmes.onpremise.domains.member.service;

import com.newmes.onpremise.domains.member.domain.Member;
import com.newmes.onpremise.domains.member.domain.Token;
import com.newmes.onpremise.domains.member.dto.request.LoginRequestDto;
import com.newmes.onpremise.domains.member.dto.request.MemberRequestDto;
import com.newmes.onpremise.domains.member.dto.response.LoginResponseDto;
import com.newmes.onpremise.domains.member.dto.response.MemberResponseDto;
import com.newmes.onpremise.domains.member.entity.MemberEntity;
import com.newmes.onpremise.domains.member.exception.MemberNotFoundException;
import com.newmes.onpremise.domains.member.exception.ValidateMemberException;
import com.newmes.onpremise.domains.member.repository.MemberRepository;
import com.newmes.onpremise.global.redis.dto.RedisDto;
import com.newmes.onpremise.global.redis.service.RedisService;
import com.newmes.onpremise.global.security.jwt.JwtUtil;
import com.newmes.onpremise.global.security.userdetails.CustomUserInfo;
import com.newmes.onpremise.global.util.MemberInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final JwtUtil jwtUtil;
    private final MemberRepository memberElasticRepository;
    private final PasswordEncoder encoder;
    private final RedisService redisService;

    public LoginResponseDto login(LoginRequestDto request) {
        MemberEntity member = memberElasticRepository.findByEmail(request.email())
                .orElseThrow(() -> new MemberNotFoundException("email not found"));

        if (!encoder.matches(request.password(), member.getPassword())) {
            throw new BadCredentialsException("password not match");
        }

        CustomUserInfo info = CustomUserInfo.from(member);
        String accessToken = jwtUtil.createAccessToken(info);
        String refreshToken = jwtUtil.createRefreshToken(info);
        log.info("info {}",info.email());
        redisService.saveRefreshToken(info.email(), refreshToken);
        log.info("redis {}",redisService.getValue(RedisDto.builder().key(info.email()).build()));
        return LoginResponseDto.from(member, accessToken);
    }

    public void logout(Token token) {
        String email = getMember().getEmail();
        String refreshToken = redisService.getRefreshToken(email);
        long remainingTime = jwtUtil.getRemainingTime(refreshToken);
        log.info("{redis: }",redisService.getValue(RedisDto.builder().key(email).build()));
        redisService.addTokenToBlacklist(token.accessToken(), 1800000);
        redisService.addTokenToBlacklist(refreshToken, remainingTime);
        redisService.deleteRefreshToken(email);
    }

    public MemberResponseDto signup(MemberRequestDto requestDto) {
        if (memberElasticRepository.existsByEmail(requestDto.email())) {
            throw new ValidateMemberException("email validate error");
        }
        Member member = requestDto.toDomain();
        member.updatePassword(encoder.encode(requestDto.password()));
        MemberEntity entity = member.toEntity();

        memberElasticRepository.save(entity);
        return MemberResponseDto.from(entity);
    }

    public MemberResponseDto update(MemberRequestDto request) {
        String memberId = MemberInfo.getMemberId();
        MemberEntity entity = memberElasticRepository.findById(memberId)
                .orElseThrow(() -> new MemberNotFoundException("email not found"));

        Member member = entity.toDomain();
        String newName = Optional.ofNullable(request.name()).orElse(member.getName());
        String newEmail = Optional.ofNullable(request.email()).orElse(member.getEmail());
        member.update(newName, newEmail);
        MemberEntity updatedEntity = member.toEntity();
        memberElasticRepository.deleteById(memberId);
        return MemberResponseDto.from(memberElasticRepository.save(updatedEntity));
    }

    public void updatePassword(String password) {
        String memberId = MemberInfo.getMemberId();
        MemberEntity entity = memberElasticRepository.findById(memberId)
                .orElseThrow(() -> new MemberNotFoundException("email not found"));

        String newPassword =  encoder.encode(password);
        Member member = entity.toDomain();
        member.updatePassword(newPassword);
        MemberEntity updatedEntity = member.toEntity();
        memberElasticRepository.deleteById(memberId);
        memberElasticRepository.save(updatedEntity);
    }

    public MemberEntity getMember() {
        String memberId = MemberInfo.getMemberId();
        return memberElasticRepository.findById(memberId)
                .orElseThrow(() -> new MemberNotFoundException("Member not found"));
    }

    public Member getMemberByEmail(String email) {
        MemberEntity entity =  memberElasticRepository.findByEmail(email)
                .orElseThrow(() -> new MemberNotFoundException("Member not found"));
        return entity.toDomain();
    }
}
