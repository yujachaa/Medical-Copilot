package com.newmes.cloud.domains.usage.domain;

import com.newmes.cloud.domains.corporate.domain.Corporate;
import com.newmes.cloud.domains.usage.entity.UsageEntity;
import lombok.Builder;
import lombok.Getter;

@Getter
public class Usage {

    private final Long id;
    private final Corporate corporate;
    private final AgentType agent;

    @Builder
    private Usage(Long id, Corporate corporate, AgentType agent) {
        this.id = id;
        this.corporate = corporate;
        this.agent = agent;
    }

    public static Usage fromEntity(UsageEntity entity) {
        return Usage.builder()
                .id(entity.getId())
                .corporate(Corporate.fromEntity(entity.getCorporate()))
                .agent(entity.getAgent())
                .build();
    }
}
