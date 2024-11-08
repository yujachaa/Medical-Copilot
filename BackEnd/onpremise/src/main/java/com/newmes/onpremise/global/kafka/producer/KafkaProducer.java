package com.newmes.onpremise.global.kafka.producer;

import com.newmes.onpremise.domains.agent.dto.request.AgentRequestDto;
import com.newmes.onpremise.domains.chat.dto.request.ChatRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class KafkaProducer {

    private final KafkaTemplate<String, AgentRequestDto> kafkaTemplate;

    public void chatSave(AgentRequestDto agentRequestDto) {
        kafkaTemplate.send("chat", agentRequestDto);
    }

}
