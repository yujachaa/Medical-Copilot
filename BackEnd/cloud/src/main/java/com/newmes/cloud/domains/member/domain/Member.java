package com.newmes.cloud.domains.member.domain;

import com.newmes.cloud.domains.member.entity.MemberEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Data
@AllArgsConstructor
public class Member {

    private final Long id;
    private final String username;
    private final String password;
    private final RoleType role;

    public static Member fromEntity(MemberEntity entity) {
        return new Member(
            entity.getId(),
            entity.getUsername(),
            entity.getPassword(),
            entity.getRole()
        );
    }
}
