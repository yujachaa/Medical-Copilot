package com.newmes.cloud.domains.usage.service;

import com.newmes.cloud.domains.usage.dto.request.UsageRequestDto;
import com.newmes.cloud.domains.usage.dto.response.TotalUsageResponseDto;
import com.newmes.cloud.domains.usage.dto.response.UsageResponseDto;

import java.util.List;

public interface UsageService {
    UsageResponseDto registerUsage(UsageRequestDto requestDto);

    TotalUsageResponseDto getTotalUsage();

    List<UsageResponseDto> getAllUsageByCorporateId(String key);
}
