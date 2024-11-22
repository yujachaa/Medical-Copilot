package com.newmes.onpremise.domains.member.domain;

import com.newmes.onpremise.domains.member.entity.MemberEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class Member {
    private String id;
    private String email;
    private String password;
    private String name;
    private String serialKey;
    private RoleType role;
    private LocalDate createDate;
    private LocalDate modifiedDate;

    public Member(String email, String password, String name, String serialKey, RoleType role) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.serialKey = serialKey;
        this.role = role;
        this.createDate = LocalDate.now();
        this.modifiedDate = LocalDate.now();
    }

    public MemberEntity toEntity() {
        return MemberEntity.builder()
                .email(this.email)
                .password(this.password)
                .name(this.name)
                .serialKey(this.serialKey)
                .role(this.role)
                .createDate(this.createDate)
                .modifiedDate(this.modifiedDate)
                .build();
    }

    public void updatePassword(String encode) {
        this.password = encode;
    }

    public void update(String newName, String newEmail) {
        this.name = newName;
        this.email = newEmail;
    }
}
