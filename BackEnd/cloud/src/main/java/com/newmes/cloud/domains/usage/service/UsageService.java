package com.newmes.cloud.domains.usage.service;

import co.elastic.clients.elasticsearch._types.aggregations.Aggregate;
import com.newmes.cloud.domains.usage.dto.request.UsageRequestDto;

import com.newmes.cloud.domains.usage.dto.response.CountResponse;
import com.newmes.cloud.domains.usage.dto.response.MonthlyResponse;
import com.newmes.cloud.domains.usage.dto.response.WeeklyResponse;
import com.newmes.cloud.domains.usage.dto.response.YearlyResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

public interface UsageService {

  CompletableFuture<String> processAgentUsage(UsageRequestDto requestDto);

  MonthlyResponse monthly() throws IOException;

  WeeklyResponse weekly() throws IOException;

  YearlyResponse yearly() throws IOException;

  CountResponse total() throws IOException;

  YearlyResponse customerYearly(String key) throws IOException;

  MonthlyResponse customerMonthly(String key) throws IOException;

  WeeklyResponse customerWeekly(String key) throws IOException;

  CountResponse customerYearlyTotal(String key) throws IOException;

  CountResponse customerMonthlyTotal(String key) throws IOException;

  CountResponse customerWeeklyTotal(String key) throws IOException;

  long weeklyTokenCount(String key) throws IOException;
}
