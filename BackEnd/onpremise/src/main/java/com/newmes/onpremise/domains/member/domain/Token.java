package com.newmes.onpremise.domains.member.domain;

public record Token(
        String accessToken,
        String refreshToken
) {
}
