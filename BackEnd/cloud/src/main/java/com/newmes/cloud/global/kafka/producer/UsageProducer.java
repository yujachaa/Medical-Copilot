package com.newmes.cloud.global.kafka.producer;

import com.newmes.cloud.domains.usage.domain.AgentUsageLog;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;

@RequiredArgsConstructor
@Service
public class UsageProducer {

    private final KafkaTemplate<String, AgentUsageLog> kafkaTemplate;
    private final ConcurrentHashMap<String, CompletableFuture<String>> futureMap = new ConcurrentHashMap<>();

    public CompletableFuture<String> sendAgentUsage(AgentUsageLog usage) {
        CompletableFuture<String> futureResponse = new CompletableFuture<>();
        String uniqueId = UUID.randomUUID().toString();
        futureMap.put(uniqueId, futureResponse);

        kafkaTemplate.send("agent-usage", uniqueId, usage).whenComplete((result, ex) -> {
            if (ex != null) {
                futureResponse.completeExceptionally(ex);
                futureMap.remove(uniqueId);
            }
        });

        return futureResponse;
    }

    public void completeFuture(String uniqueId, String message) {
        CompletableFuture<String> future = futureMap.remove(uniqueId);
        if (future != null) {
            future.complete(message);
        }
    }
}
