package com.newmes.cloud.global.kafka.producer;

import com.google.gson.Gson;
import com.newmes.cloud.domains.usage.domain.AgentUsageLog;
import com.newmes.cloud.global.kafka.dto.UsageResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;

@RequiredArgsConstructor
@Service
public class UsageProducer {

    final Gson gson = new Gson();
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

    public void completeFuture(String uniqueId, UsageResponseDto usageResponseDto) {
        CompletableFuture<String> future = futureMap.remove(uniqueId);
        if (future != null) {
            String usageResponseJson = gson.toJson(usageResponseDto);
            future.complete(usageResponseJson);
        }
    }
}
