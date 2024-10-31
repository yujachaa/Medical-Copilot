package com.newmes.onpremise.global.security.userdetails;

import com.newmes.onpremise.domains.member.domain.RoleType;
import com.newmes.onpremise.domains.member.entity.MemberEntity;
import lombok.Builder;

import java.io.Serializable;

@Builder
public record CustomUserInfo(String id, String email, String password, String name, RoleType role) implements
	Serializable {

	public static CustomUserInfo from(MemberEntity member) {
		return CustomUserInfo.builder()
			.id(member.getId())
			.email(member.getEmail())
			.password(member.getPassword())
			.name(member.getName())
			.role(member.getRole())
			.build();
	}
}
