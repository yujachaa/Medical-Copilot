package com.newmes.onpremise.domains.member.dto.request;

import com.newmes.onpremise.domains.member.domain.Member;
import com.newmes.onpremise.domains.member.domain.RoleType;
import lombok.Builder;

@Builder
public record MemberRequestDto(
        String email,
        String password,
        String name,
        String serialKey,
        RoleType role
) {

    public Member toDomain() {
        return new Member(
                this.email,
                this.password,
                this.name,
                this.serialKey,
                this.role
        );
    }
}
