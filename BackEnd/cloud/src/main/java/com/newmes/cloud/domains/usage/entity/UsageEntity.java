package com.newmes.cloud.domains.usage.entity;

import com.newmes.cloud.domains.corporate.entity.CorporateEntity;
import com.newmes.cloud.domains.usage.domain.Usage;
import com.newmes.cloud.global.entity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor
@Table(name = "usage")
public class UsageEntity extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "corporate_id", nullable = false)
    private CorporateEntity corporate;

    private int agentCount;

    private String key;

    @Builder
    public UsageEntity(CorporateEntity corporate, int agentCount, String key) {
        this.corporate = corporate;
        this.agentCount = agentCount;
        this.key = key;
    }

    public static UsageEntity fromDomain(Usage usage) {
        return UsageEntity.builder()
                .corporate(usage.getCorporate().toEntity())
                .agentCount(usage.getAgentCount())
                .key(usage.getKey())
                .build();
    }

    public void incrementAgentCount() {
        this.agentCount += 1;
    }

    public void initAgentCount(){
        this.agentCount = 0;
    }
}
