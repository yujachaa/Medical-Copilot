package com.newmes.onpremise.global.security.exception;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.newmes.onpremise.global.security.dto.ErrorResponseDto;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalDateTime;

@Slf4j // kafka 연결 시 (topic = "")
@AllArgsConstructor
@Component
public class CustomAccessDeniedHandler implements AccessDeniedHandler {

	private final ObjectMapper objectMapper;

	@Override
	public void handle(final HttpServletRequest request, final HttpServletResponse response,
		final AccessDeniedException accessDeniedException) throws IOException, ServletException {
		log.error("인증 객체가 존재하지 않습니다.", accessDeniedException);

		ErrorResponseDto errorResponseDto = new ErrorResponseDto(HttpStatus.FORBIDDEN.value(),
			accessDeniedException.getMessage(),
			LocalDateTime.now());

		String responseBody = objectMapper.writeValueAsString(errorResponseDto);
		response.setContentType(MediaType.APPLICATION_JSON_VALUE);
		response.setStatus(HttpStatus.FORBIDDEN.value());
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(responseBody);
	}
}
