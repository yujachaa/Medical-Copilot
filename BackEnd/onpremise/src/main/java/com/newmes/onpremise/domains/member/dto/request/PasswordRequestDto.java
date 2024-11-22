package com.newmes.onpremise.domains.member.dto.request;

public record PasswordRequestDto(
        String currentPw,
        String password
) {
}
