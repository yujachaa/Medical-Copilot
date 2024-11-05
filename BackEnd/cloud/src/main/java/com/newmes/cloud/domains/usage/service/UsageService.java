package com.newmes.cloud.domains.usage.service;

import com.newmes.cloud.domains.usage.dto.request.UsageRequestDto;

import java.util.Map;
import java.util.concurrent.CompletableFuture;

public interface UsageService {

    CompletableFuture<String> processAgentUsage(UsageRequestDto requestDto);

  Map<String, long[]> monthly();

  Map<String, long[]> weekly();

  Map<String, long[]> yearly();

  Map<String, Long> total();

  Map<String,long[]> customerYearly(String key);

  Map<String,long[]> customerMonthly(String key);

  Map<String,long[]> customerWeekly(String key);

  Map<String, Long> customerYearlyTotal(String key);

  Map<String, Long> customerMonthlyTotal(String key);

  Map<String, Long> customerWeeklyTotal(String key);
}
