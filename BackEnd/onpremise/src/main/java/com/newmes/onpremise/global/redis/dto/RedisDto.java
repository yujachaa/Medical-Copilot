package com.newmes.onpremise.global.redis.dto;

import lombok.*;

import java.time.Duration;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class RedisDto {
	private String key;
	private String value;
	private Duration duration;
}
