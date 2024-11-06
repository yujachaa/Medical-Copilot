package com.newmes.onpremise.global.kafka.producer;

import com.newmes.onpremise.domains.chat.dto.request.ChatRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class KafkaProducer {

    private final KafkaTemplate<String, ChatRequestDto> kafkaTemplate;

    public void chatSave(ChatRequestDto chat) {
        kafkaTemplate.send("chat", chat);
    }

}
