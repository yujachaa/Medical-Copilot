package com.newmes.onpremise.global.config;

import com.newmes.onpremise.domains.chat.dto.request.ChatRequestDto;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;

@Configuration
public class KafkaConfig {

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, ChatRequestDto> kafkaListenerContainerFactory(
            ConsumerFactory<String, ChatRequestDto> consumerFactory) {
        ConcurrentKafkaListenerContainerFactory<String, ChatRequestDto> factory =
            new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(consumerFactory);
        return factory;
    }
}
