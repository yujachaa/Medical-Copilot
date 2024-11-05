package com.newmes.onpremise.global.security.jwt;

import com.newmes.onpremise.global.security.userdetails.CustomUserInfo;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Slf4j
@Component
public class JwtUtil {
	private final Key accessKey;
	private final Key refreshKey;
	private final long accessTokenExpTime;
	private final long refreshTokenExpTime;

	public JwtUtil(
			@Value("${jwt.secret}") String accessSecretKey,
			@Value("${jwt.refresh_secret}") String refreshSecretKey,
			@Value("${jwt.expiration_time}") long accessTokenExpTime,
			@Value("${jwt.refresh_expiration_time}") long refreshTokenExpTime) {

		byte[] accessKeyBytes = Decoders.BASE64.decode(accessSecretKey);
		byte[] refreshKeyBytes = Decoders.BASE64.decode(refreshSecretKey);

		this.accessKey = Keys.hmacShaKeyFor(accessKeyBytes);
		this.refreshKey = Keys.hmacShaKeyFor(refreshKeyBytes);

		this.accessTokenExpTime = accessTokenExpTime;
		this.refreshTokenExpTime = refreshTokenExpTime;
	}

	public String createAccessToken(CustomUserInfo member) {
		return createToken(member, accessTokenExpTime,accessKey);
	}

	public String createRefreshToken(CustomUserInfo member) {
		return createToken(member, refreshTokenExpTime, refreshKey);
	}

	private String createToken(CustomUserInfo member, long expireTime, Key key) {
		Claims claims = Jwts.claims().setSubject(member.email());
		claims.put("id", member.id());
		claims.put("email", member.name());
		claims.put("role", member.role());
		Date now = new Date();
		Date validity = new Date(now.getTime() + expireTime * 1000);

		return Jwts.builder()
			.setClaims(claims)
			.setIssuedAt(now)
			.setExpiration(validity)
			.signWith(key, SignatureAlgorithm.HS256)
			.compact();
	}

	public boolean isValidToken(String token) {
		try {
			Jwts.parserBuilder().setSigningKey(accessKey).build().parseClaimsJws(token);
			return true;
		} catch (Exception e) {
			log.error("Invalid token: {}", e.getMessage());
			return false;
		}
	}

	public String getUsernameFromToken(String token) {
		Claims claims = Jwts.parserBuilder().setSigningKey(accessKey).build().parseClaimsJws(token).getBody();
		return claims.getSubject();
	}

	public long getRemainingTime(String token) {
		log.info("{}",token);
		Date expiration = Jwts.parserBuilder().setSigningKey(refreshKey).build().parseClaimsJws(token).getBody().getExpiration();
		return expiration.getTime() - new Date().getTime();
	}
}
