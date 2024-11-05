package com.newmes.onpremise.domains.member.dto.request;

public record LoginRequestDto(
        String email,
        String password
) {
}
