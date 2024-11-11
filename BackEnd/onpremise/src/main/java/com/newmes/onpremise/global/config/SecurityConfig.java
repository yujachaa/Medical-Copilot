package com.newmes.onpremise.global.config;

import com.newmes.onpremise.global.redis.service.RedisService;
import com.newmes.onpremise.global.security.exception.CustomAccessDeniedHandler;
import com.newmes.onpremise.global.security.exception.CustomAuthenticationEntryPoint;
import com.newmes.onpremise.global.security.jwt.JwtAuthFilter;
import com.newmes.onpremise.global.security.jwt.JwtUtil;
import com.newmes.onpremise.global.security.userdetails.CustomUserDetailsService;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import java.util.*;

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
			"/swagger-ui/**", "/**", "/notification/emitter/**"
	};

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

		http
				.cors(cors -> cors.configurationSource(request -> {
                    CorsConfiguration configuration = new CorsConfiguration();
                    configuration.setAllowedOrigins(Arrays.asList(
                            "https://k11s205.p.ssafy.io",
                            "http://localhost:3000",
                            "http://localhost:3001",
							"https://medical-copilot.net"
                    ));
                    configuration.setAllowedMethods(Arrays.asList("*"));
                    configuration.setAllowCredentials(true);
                    configuration.setAllowedHeaders(Collections.singletonList("*"));
                    configuration.setExposedHeaders(List.of("Authorization", "Set-Cookie"));
                    configuration.setMaxAge(3600L);
                    return configuration;
                }))
				.csrf(csrf -> csrf.disable())
				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.formLogin(form -> form.disable())
				.httpBasic(basic -> basic.disable())
				.addFilterBefore(new JwtAuthFilter(customUserDetailsService, jwtUtil, redisService),
						UsernamePasswordAuthenticationFilter.class)
				.securityContext(securityContext -> securityContext.requireExplicitSave(true))
				.exceptionHandling(exceptionHandling -> exceptionHandling
						.authenticationEntryPoint(authenticationEntryPoint)
						.accessDeniedHandler(accessDeniedHandler))
				.authorizeHttpRequests(authorize -> authorize
						.requestMatchers(AUTH_WHITELIST).permitAll()
						.anyRequest().authenticated());

		return http.build();
	}
}
