package com.newmes.onpremise.global.redis.service;

import com.newmes.onpremise.global.redis.dto.RedisDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
@RequiredArgsConstructor
public class RedisServiceImpl implements RedisService {

	private static final String RECENT_SEARCH_KEY_PREFIX = "recent_search:";
	private final RedisTemplate<String, Object> redisTemplate;

	@Value("${jwt.refresh_expiration_time}")
	private long refreshTokenExpTime;

	@Override
	public void saveRefreshToken(String email, String refreshToken) {
		redisTemplate.opsForValue().set(email, refreshToken, refreshTokenExpTime, TimeUnit.SECONDS);
	}

	@Override
	public String getRefreshToken(String email) {
		return (String) redisTemplate.opsForValue().get(email);
	}

	@Override
	public void deleteRefreshToken(String email) {
		redisTemplate.delete(email);
	}

	@Override
	public void setValue(RedisDto redisDto) {
		String key = redisDto.getKey();
		Object value = redisDto.getValue();
		redisTemplate.opsForValue().set(key, value);
	}

	@Override
	public void setValueWithTimeout(RedisDto redisDto) {
		String key = redisDto.getKey();
		Object value = redisDto.getValue();
		Duration timeout = redisDto.getDuration();
		redisTemplate.opsForValue().set(key, value, timeout);
	}

	@Override
	public String getValue(RedisDto redisDto) {
		String key = redisDto.getKey();
		Object value = redisTemplate.opsForValue().get(key);
		return value != null ? value.toString() : null;
	}

	@Override
	public void deleteValue(RedisDto redisDto) {
		String key = redisDto.getKey();
		redisTemplate.delete(key);
	}

	@Override
	public void addTokenToBlacklist(final String token, final long expirationTime) {
		redisTemplate.opsForValue().set(token, "blacklisted", expirationTime, TimeUnit.MILLISECONDS);
	}

	@Override
	public boolean isTokenBlacklisted(final String token) {
		return redisTemplate.hasKey(token);
	}

}
