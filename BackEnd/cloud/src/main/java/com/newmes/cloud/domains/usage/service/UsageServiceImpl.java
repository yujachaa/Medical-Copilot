package com.newmes.cloud.domains.usage.service;

import com.newmes.cloud.domains.corporate.domain.Corporate;
import com.newmes.cloud.domains.corporate.exception.CorporateNotFoundException;
import com.newmes.cloud.domains.corporate.repository.CorporateRepository;
import com.newmes.cloud.domains.usage.domain.AgentUsageLog;
import com.newmes.cloud.domains.usage.dto.request.UsageRequestDto;
import com.newmes.cloud.global.kafka.producer.UsageProducer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


import java.util.concurrent.CompletableFuture;

@RequiredArgsConstructor
@Service
public class UsageServiceImpl implements UsageService{

    private final CorporateRepository corporateRepository;
    private final UsageProducer kafkaProducerService;

    public CompletableFuture<String> processAgentUsage(UsageRequestDto requestDto) {
        Corporate corporate = Corporate.fromEntity(
                corporateRepository.findByKey(requestDto.key())
                        .orElseThrow(() -> new CorporateNotFoundException("Invalid key: " + requestDto.key()))
        );

        AgentUsageLog result = AgentUsageLog.builder()
                .id(corporate.getId())
                .key(requestDto.key())
                .agent(requestDto.agent())
                .grade(corporate.getGrade())
                .build();

        return kafkaProducerService.sendAgentUsage(result);
    }

}
