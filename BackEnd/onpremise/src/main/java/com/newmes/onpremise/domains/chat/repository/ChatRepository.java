package com.newmes.onpremise.domains.chat.repository;

import com.newmes.onpremise.domains.chat.entity.ChatDocument;
import java.util.List;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface ChatRepository extends ElasticsearchRepository<ChatDocument, String> {

  List<ChatDocument> findAllByPatientIdOrderByRegdateDesc(String patientId);
}
