package com.newmes.onpremise.global.config;


import com.newmes.onpremise.global.redis.service.RedisService;
import com.newmes.onpremise.global.security.jwt.JwtAuthFilter;
import com.newmes.onpremise.global.security.jwt.JwtUtil;
import com.newmes.onpremise.global.security.exception.CustomAccessDeniedHandler;
import com.newmes.onpremise.global.security.exception.CustomAuthenticationEntryPoint;
import com.newmes.onpremise.global.security.userdetails.CustomUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.AllArgsConstructor;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig {

	private final CustomUserDetailsService customUserDetailsService;
	private final JwtUtil jwtUtil;
	private final CustomAccessDeniedHandler accessDeniedHandler;
	private final CustomAuthenticationEntryPoint authenticationEntryPoint;
	private final RedisService redisService;

	private static final String[] AUTH_WHITELIST = {
		"/swagger-ui/**", "/api/**"}; //, "swagger-ui-custom.html"};

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.csrf(AbstractHttpConfigurer::disable);
		http.cors(Customizer.withDefaults());

		http.sessionManagement(sessionManagement -> sessionManagement
			.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

		http.formLogin(AbstractHttpConfigurer::disable);
		http.httpBasic(AbstractHttpConfigurer::disable);

		http.addFilterBefore(new JwtAuthFilter(customUserDetailsService, jwtUtil, redisService),
			UsernamePasswordAuthenticationFilter.class);

		http.exceptionHandling(exceptionHandling -> exceptionHandling
				.authenticationEntryPoint(authenticationEntryPoint)
				.accessDeniedHandler(accessDeniedHandler));

		http.authorizeHttpRequests(authorize -> authorize
			.requestMatchers(AUTH_WHITELIST).permitAll()
			.anyRequest().permitAll()//authenticated()
		);

		return http.build();
	}
}
