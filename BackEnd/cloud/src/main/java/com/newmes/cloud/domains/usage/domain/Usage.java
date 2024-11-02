package com.newmes.cloud.domains.usage.domain;

import com.newmes.cloud.domains.corporate.domain.Corporate;
import com.newmes.cloud.domains.usage.entity.UsageEntity;
import lombok.Builder;
import lombok.Getter;

@Getter
public class Usage {

    private final Long id;
    private final Corporate corporate;
    private final int agentCount;
    private final String key;

    @Builder
    public Usage(Long id, Corporate corporate, int agentCount, String key) {
        this.id = id;
        this.corporate = corporate;
        this.agentCount = agentCount;
        this.key = key;
    }

    public static Usage fromEntity(UsageEntity entity) {
        return Usage.builder()
                .id(entity.getId())
                .corporate(Corporate.fromEntity(entity.getCorporate()))
                .agentCount(entity.getAgentCount())
                .key(entity.getKey())
                .build();
    }
}
