package com.newmes.onpremise.domains.member.dto.response;

import com.newmes.onpremise.domains.member.domain.RoleType;
import com.newmes.onpremise.domains.member.entity.MemberEntity;
import lombok.*;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberResponseDto {
    private String id;
    private String email;
    private String name;
    private String serialKey;
    private RoleType role;
    private LocalDate createDate;
    private LocalDate modifiedDate;

    // 엔티티에서 ResponseDto로 변환
    public static MemberResponseDto from(MemberEntity entity) {
        return MemberResponseDto.builder()
                .id(entity.getId())
                .email(entity.getEmail())
                .name(entity.getName())
                .serialKey(entity.getSerialKey())
                .role(entity.getRole())
                .createDate(entity.getCreateDate())
                .modifiedDate(entity.getModifiedDate())
                .build();
    }
}
