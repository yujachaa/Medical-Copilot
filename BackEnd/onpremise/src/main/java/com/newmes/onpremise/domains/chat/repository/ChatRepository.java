package com.newmes.onpremise.domains.chat.repository;

import java.util.List;

import com.newmes.onpremise.domains.chat.entity.ChatEntity;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface ChatRepository extends ElasticsearchRepository<ChatEntity, String> {
  List<ChatEntity> findByPID(String pid);
}