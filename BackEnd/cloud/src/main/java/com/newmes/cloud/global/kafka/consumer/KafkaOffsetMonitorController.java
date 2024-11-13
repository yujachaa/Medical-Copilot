package com.newmes.cloud.global.kafka.consumer;

import com.newmes.cloud.global.kafka.service.KafkaOffsetMonitor;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.common.TopicPartition;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/kafka")
@RequiredArgsConstructor
public class KafkaOffsetMonitorController {

    private final KafkaOffsetMonitor kafkaOffsetMonitor;

    @GetMapping("/topics/{topic}")
    public ResponseEntity<?> getMessageCount(@PathVariable String topic) {
        try {
            Map<TopicPartition, Long> messageCount = kafkaOffsetMonitor.getLag(topic,"agent_usage_group");
            return ResponseEntity.ok(messageCount);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to fetch message count");
            return ResponseEntity.status(500).body(errorResponse);
        }
    }
}
