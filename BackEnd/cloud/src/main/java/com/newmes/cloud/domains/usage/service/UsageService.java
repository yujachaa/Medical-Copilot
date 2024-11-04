package com.newmes.cloud.domains.usage.service;

import com.newmes.cloud.domains.usage.dto.request.UsageRequestDto;

import java.util.concurrent.CompletableFuture;

public interface UsageService {

    CompletableFuture<String> processAgentUsage(UsageRequestDto requestDto);


}
