package com.newmes.cloud.domains.usage.dto.request;

import com.newmes.cloud.domains.usage.domain.AgentType;

public record UsageRequestDto(String key, AgentType agent) {

}
