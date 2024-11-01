package com.newmes.cloud.domains.usage.dto.response;

import com.newmes.cloud.domains.usage.domain.AgentType;
import com.newmes.cloud.domains.usage.domain.Usage;
import lombok.Builder;

public record UsageResponseDto(Long id, String key, AgentType agent) {

    @Builder
    public UsageResponseDto {
    }

    public static UsageResponseDto fromDomain(Usage usage) {
        return UsageResponseDto.builder()
                .id(usage.getId())
                .key(usage.getCorporate().getKey())
                .agent(usage.getAgent())
                .build();
    }
}
