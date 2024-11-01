package com.newmes.cloud.domains.usage.dto.request;

import com.newmes.cloud.domains.corporate.domain.Corporate;
import com.newmes.cloud.domains.corporate.entity.CorporateEntity;
import com.newmes.cloud.domains.usage.domain.AgentType;
import com.newmes.cloud.domains.usage.domain.Usage;

public record UsageRequestDto(String key, AgentType agent) {

    public Usage toUsage(CorporateEntity corporate) {
        return Usage.builder()
                .corporate(Corporate.fromEntity(corporate))
                .agent(agent)
                .build();
    }
}
