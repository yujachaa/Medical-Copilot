package com.newmes.onpremise.global.kafka.consumer;

import com.newmes.onpremise.domains.chat.dto.request.ChatRequestDto;
import com.newmes.onpremise.domains.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
@Slf4j
@RequiredArgsConstructor
@Component
public class KafkaConsumer {

    private final ChatService chatService;

    @KafkaListener(topics = "chat", groupId = "ai-group")
    public void chat(ConsumerRecord<String, ChatRequestDto> record) {

        ChatRequestDto chatMessage = record.value();
        log.info("Received message from Kafka topic: {}", chatMessage);

        chatService.add(chatMessage);
    }
}
