package com.newmes.cloud.domains.usage.entity;

import com.newmes.cloud.domains.corporate.entity.CorporateEntity;
import com.newmes.cloud.domains.usage.domain.AgentType;
import com.newmes.cloud.domains.usage.domain.Usage;
import com.newmes.cloud.global.entity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor
public class UsageEntity extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "com_id", nullable = false)
    private CorporateEntity corporate;

    @Enumerated(EnumType.STRING)
    private AgentType agent;

    @Builder
    public UsageEntity(CorporateEntity corporate, AgentType agent) {
        this.corporate = corporate;
        this.agent = agent;
    }

    public static UsageEntity fromDomain(Usage usage) {
        return UsageEntity.builder()
                .corporate(usage.getCorporate().toEntity())
                .agent(usage.getAgent())
                .build();
    }

    public void updateEntity(CorporateEntity entity){
        corporate = entity;
    }
}
