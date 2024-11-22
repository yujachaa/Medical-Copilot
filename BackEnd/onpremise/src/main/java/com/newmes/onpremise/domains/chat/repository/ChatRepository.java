package com.newmes.onpremise.domains.chat.repository;

import java.util.List;

import com.newmes.onpremise.domains.chat.entity.ChatEntity;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface ChatRepository extends ElasticsearchRepository<ChatEntity, String> {
  List<ChatEntity> findByPID(String pid);
  Page<ChatEntity> findByPID(String pid, Pageable pageable);

}