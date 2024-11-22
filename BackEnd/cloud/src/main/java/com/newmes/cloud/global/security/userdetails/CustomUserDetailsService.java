package com.newmes.cloud.global.security.userdetails;

import com.newmes.cloud.domains.member.entity.MemberEntity;
import com.newmes.cloud.domains.member.exception.MemberNotFoundException;
import com.newmes.cloud.domains.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

	private final MemberRepository memberRepository;

	@Override
	public UserDetails loadUserByUsername(final String username)  {
		MemberEntity memberEntity = memberRepository.findByUsername(username)
				.orElseThrow(() -> new MemberNotFoundException(username));

		CustomUserInfo dto = CustomUserInfo.from(memberEntity);

		return new CustomUserDetails(dto);
	}

}
