package com.newmes.onpremise.global.kafka.producer;

import com.newmes.onpremise.domains.agent.dto.request.AgentRequestDto;
import com.newmes.onpremise.domains.chat.dto.request.ChatRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.messaging.Message;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class KafkaProducer {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void chatSave(AgentRequestDto agentRequestDto) {
        Message<AgentRequestDto> message = MessageBuilder
                .withPayload(agentRequestDto)
                .setHeader("spring.json.type.id", AgentRequestDto.class.getName())
                .build();

        // Message 객체를 직접 전송
        kafkaTemplate.send("chat", message);
    }

}
