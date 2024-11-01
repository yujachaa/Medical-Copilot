package com.newmes.cloud.domains.usage.dto.response;

public record TotalUsageResponseDto(
        Long totalUsage,
        Long madGuruUsage,
        Long cxrUsage,
        Long capsuleUsage
) {}
