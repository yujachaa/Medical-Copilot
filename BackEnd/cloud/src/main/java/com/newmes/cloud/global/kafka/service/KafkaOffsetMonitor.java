package com.newmes.cloud.global.kafka.service;

import org.apache.kafka.clients.admin.*;
import org.apache.kafka.common.TopicPartition;
import org.apache.kafka.common.TopicPartitionInfo;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class KafkaOffsetMonitor {

    private final AdminClient adminClient;

    public KafkaOffsetMonitor(AdminClient adminClient) {
        this.adminClient = adminClient;
    }

    public Map<TopicPartition, Long> getMessageCount(String topic) throws Exception {
        Map<TopicPartition, Long> messageCount = new HashMap<>();

        DescribeTopicsResult describeTopics = adminClient.describeTopics(Collections.singleton(topic));
        TopicDescription description = describeTopics.values().get(topic).get();

        Map<TopicPartition, OffsetSpec> request = new HashMap<>();
        for (TopicPartitionInfo partitionInfo : description.partitions()) {
            TopicPartition partition = new TopicPartition(topic, partitionInfo.partition());
            request.put(partition, OffsetSpec.latest());
        }

        Map<TopicPartition, ListOffsetsResult.ListOffsetsResultInfo> offsets = adminClient.listOffsets(request).all().get();
        for (Map.Entry<TopicPartition, ListOffsetsResult.ListOffsetsResultInfo> entry : offsets.entrySet()) {
            messageCount.put(entry.getKey(), entry.getValue().offset());
        }
        return messageCount;
    }
}
