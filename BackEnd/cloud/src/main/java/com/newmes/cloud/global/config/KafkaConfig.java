package com.newmes.cloud.global.config;

import com.newmes.cloud.domains.usage.domain.AgentUsageLog;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;

@Configuration
public class KafkaConfig {

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, AgentUsageLog> kafkaListenerContainerFactory(
            ConsumerFactory<String, AgentUsageLog> consumerFactory) {
        ConcurrentKafkaListenerContainerFactory<String, AgentUsageLog> factory = 
            new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(consumerFactory);
        return factory;
    }
}
