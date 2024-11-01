package com.newmes.cloud.global.kafka.service;

import com.newmes.cloud.domains.corporate.domain.Grade;
import com.newmes.cloud.domains.usage.domain.AgentUsageLog;
import com.newmes.cloud.domains.usage.entity.UsageEntity;
import com.newmes.cloud.domains.usage.repository.UsageRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class KafkaService {

    private static final Logger logger = LoggerFactory.getLogger(KafkaService.class);

    private final UsageRepository usageRepository;

    public void processUsageMessage(AgentUsageLog agentUsageLog) {
        UsageEntity usageEntity = usageRepository.findById(agentUsageLog.getId())
                .orElseThrow(() -> new IllegalArgumentException("Usage ID not found: " + agentUsageLog.getId()));

        long maxUsageLimit = getUsageLimitByGrade(agentUsageLog.getGrade());

        if (usageEntity.getAgentCount() >= maxUsageLimit) {
            throw new IllegalStateException("agent limit exceeded for grade " + agentUsageLog.getGrade()
                    + ": maximum allowed is " + maxUsageLimit);
        }
        usageEntity.incrementAgentCount();
        usageRepository.save(usageEntity);
        logger.info("Business Log: Usage update successful for ID {}, grade {}, current agent count: {}",
                usageEntity.getId(), agentUsageLog.getGrade(), usageEntity.getAgentCount());
    }

    private long getUsageLimitByGrade(Grade grade) {
        return switch (grade) {
            case PLATINUM -> 500;
            case GOLD -> 200;
            case SILVER -> 100;
            default -> 50;
        };
    }
}
