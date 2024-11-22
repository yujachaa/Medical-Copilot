package com.newmes.onpremise.global.security.userdetails;

import com.newmes.onpremise.domains.member.entity.MemberEntity;
import com.newmes.onpremise.domains.member.exception.MemberNotFoundException;
import com.newmes.onpremise.domains.member.repository.MemberRepository;
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
	public UserDetails loadUserByUsername(final String email)  {
		MemberEntity memberEntity = memberRepository.findByEmail(email)
				.orElseThrow(() -> new MemberNotFoundException(email));

		CustomUserInfo dto = CustomUserInfo.from(memberEntity);

		return new CustomUserDetails(dto);
	}

}
