package com.newmes.cloud.global.kafka.service;

import org.apache.kafka.clients.admin.*;
import org.apache.kafka.clients.consumer.OffsetAndMetadata;
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


    public Map<TopicPartition, Long> getLag(String topic, String groupId) throws Exception {
        Map<TopicPartition, Long> lagMap = new HashMap<>();

        // 최신 오프셋 가져오기
        Map<TopicPartition, OffsetSpec> request = new HashMap<>();
        DescribeTopicsResult describeTopics = adminClient.describeTopics(Collections.singleton(topic));
        TopicDescription description = describeTopics.values().get(topic).get();

        for (TopicPartitionInfo partitionInfo : description.partitions()) {
            TopicPartition partition = new TopicPartition(topic, partitionInfo.partition());
            request.put(partition, OffsetSpec.latest());
        }

        Map<TopicPartition, ListOffsetsResult.ListOffsetsResultInfo> latestOffsets = adminClient.listOffsets(request).all().get();

        // 커밋된 오프셋 가져오기
        Map<TopicPartition, OffsetAndMetadata> committedOffsets = adminClient.listConsumerGroupOffsets(groupId).partitionsToOffsetAndMetadata().get();

        // Lag 계산
        for (Map.Entry<TopicPartition, ListOffsetsResult.ListOffsetsResultInfo> entry : latestOffsets.entrySet()) {
            TopicPartition partition = entry.getKey();
            long latestOffset = entry.getValue().offset();
            long committedOffset = committedOffsets.getOrDefault(partition, new OffsetAndMetadata(0L)).offset();
            long lag = latestOffset - committedOffset;
            lagMap.put(partition, lag);
        }

        return lagMap;
    }
}
