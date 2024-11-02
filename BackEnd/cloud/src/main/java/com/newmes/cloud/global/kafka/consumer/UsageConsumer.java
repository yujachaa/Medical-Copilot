package com.newmes.cloud.global.kafka.consumer;

import com.newmes.cloud.domains.usage.domain.AgentUsageLog;
import com.newmes.cloud.global.kafka.producer.UsageProducer;
import com.newmes.cloud.global.kafka.service.KafkaService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
@Slf4j
@RequiredArgsConstructor
@Component
public class UsageConsumer {

    private final KafkaService kafkaService;
    private final UsageProducer kafkaUsageProducer;

    @KafkaListener(topics = "agent-usage", groupId = "agent_usage_group")
    public void consumeUsage(ConsumerRecord<String, AgentUsageLog> record) {
        String uniqueId = record.key();
        AgentUsageLog agentUsageLog = record.value();

        try {
            kafkaService.processUsageMessage(agentUsageLog);

            kafkaUsageProducer.completeFuture(uniqueId, "Usage processed successfully for corporate id: " + agentUsageLog.getId());
        } catch (Exception e) {
            kafkaUsageProducer.completeFuture(uniqueId, "Error processing usage: " + e.getMessage());
        }
    }


}
