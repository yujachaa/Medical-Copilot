package com.newmes.cloud.domains.usage.domain;

import com.newmes.cloud.domains.corporate.domain.Grade;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AgentUsageLog {
    private Long id;
    private String key;
    private Grade grade;
    private AgentType agent;

}
