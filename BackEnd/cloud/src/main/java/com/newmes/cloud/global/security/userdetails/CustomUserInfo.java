package com.newmes.cloud.global.security.userdetails;

import com.newmes.cloud.domains.member.domain.RoleType;
import com.newmes.cloud.domains.member.entity.MemberEntity;
import lombok.Builder;

import java.io.Serializable;

@Builder
public record CustomUserInfo(Long id, String username, String password, RoleType role) implements
	Serializable {

	public static CustomUserInfo from(MemberEntity member) {
		return CustomUserInfo.builder()
			.id(member.getId())
			.username(member.getUsername())
			.password(member.getPassword())
			.role(member.getRole())
			.build();
	}
}
