package com.newmes.onpremise.domains.member.dto.response;

import com.newmes.onpremise.domains.member.domain.RoleType;
import com.newmes.onpremise.domains.member.entity.MemberEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class LoginResponseDto {
    private String id;
    private String email;
    private String name;
    private String serialKey;
    private RoleType role;
    private LocalDate createDate;
    private LocalDate modifiedDate;
    private String accessToken;

    public static LoginResponseDto from(MemberEntity entity,String token) {
        return LoginResponseDto.builder()
                .id(entity.getId())
                .email(entity.getEmail())
                .name(entity.getName())
                .serialKey(entity.getSerialKey())
                .role(entity.getRole())
                .createDate(entity.getCreateDate())
                .modifiedDate(entity.getModifiedDate())
                .accessToken(token)
                .build();
    }
}
