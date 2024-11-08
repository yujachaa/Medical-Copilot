package com.newmes.onpremise.domains.agent.controller;

import com.newmes.onpremise.domains.agent.dto.request.AgentRequestDto;
import com.newmes.onpremise.global.kafka.producer.KafkaProducer;
import com.newmes.onpremise.global.util.MemberInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpStatus;
import java.util.Map;

@RestController
@RequestMapping("/agent")
@RequiredArgsConstructor
public class AgentController {

    @Value("${external.server.url}")
    private String externalServerUrl;

    private final RestTemplate restTemplate;
    private final KafkaProducer kafkaProducer;


    @PostMapping
    public ResponseEntity<?> processAgentRequest(@RequestBody AgentRequestDto agentRequestDto) {
        agentRequestDto = agentRequestDto.withMemberId(MemberInfo.getMemberId());

        ResponseEntity<Map> responseEntity;
        try {
            responseEntity = restTemplate.postForEntity(externalServerUrl, agentRequestDto, Map.class);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Failed to connect to the external server", "error", e.getMessage()));
        }

        Map<String, Object> responseBody = responseEntity.getBody();
        if (responseBody != null && Boolean.TRUE.equals(responseBody.get("isSuccess"))) {
            try {
                kafkaProducer.chatSave(agentRequestDto);
                return ResponseEntity.ok(Map.of("message", "Request processed and sent to Kafka."));
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(Map.of("message", "Failed to send to Kafka", "error", e.getMessage()));
            }
        } else {
            String errorMessage = (String) responseBody.get("message");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "Request failed", "error", errorMessage));
        }
    }
}
