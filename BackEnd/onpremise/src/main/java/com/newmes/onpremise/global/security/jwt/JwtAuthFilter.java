package com.newmes.onpremise.global.security.jwt;

import com.newmes.onpremise.global.redis.service.RedisService;
import com.newmes.onpremise.global.security.userdetails.CustomUserDetails;
import com.newmes.onpremise.global.security.userdetails.CustomUserDetailsService;
import com.newmes.onpremise.global.security.userdetails.CustomUserInfo;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

	private final CustomUserDetailsService customUserDetailsService;
	private final JwtUtil jwtUtil;
	private final RedisService redisService;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
		throws ServletException, IOException {
		String authorizationHeader = request.getHeader("Authorization");
		String refreshTokenHeader = request.getHeader("RefreshToken");

		if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
			String token = authorizationHeader.substring(7);
			try {
				if (redisService.isTokenBlacklisted(token)) {
					response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
					return;
				}

				if (jwtUtil.isValidToken(token)) {
					String email = jwtUtil.getUsernameFromToken(token);

					UserDetails userDetails = customUserDetailsService.loadUserByUsername(email);

					if (userDetails != null) {
						UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
							userDetails, null, userDetails.getAuthorities());
						SecurityContextHolder.getContext().setAuthentication(authentication);
					}
				}
			} catch (ExpiredJwtException e) {
				if (refreshTokenHeader != null && refreshTokenHeader.startsWith("Bearer ")) {
					String refreshToken = refreshTokenHeader.substring(7);
					if (jwtUtil.isValidToken(refreshToken) && refreshToken.equals(redisService.getRefreshToken(jwtUtil.getUsernameFromToken(refreshToken)))) {
						String email = jwtUtil.getUsernameFromToken(refreshToken);
						UserDetails userDetails = customUserDetailsService.loadUserByUsername(email);
						if (userDetails != null) {
							CustomUserInfo userInfo = ((CustomUserDetails) userDetails).getUserInfo();
							String newAccessToken = jwtUtil.createAccessToken(userInfo);
							response.setHeader("Authorization", "Bearer " + newAccessToken);
						}
					} else {
						response.setStatus(HttpServletResponse.SC_FORBIDDEN);
						return;
					}
				} else {
					response.setStatus(HttpServletResponse.SC_FORBIDDEN);
					return;
				}
			}
		}

		filterChain.doFilter(request, response);
	}
}
