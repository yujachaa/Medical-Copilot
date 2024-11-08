package com.newmes.onpremise.domains.history.repository;

import com.newmes.onpremise.domains.history.entity.HistoryEntity;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import java.util.List;

public interface HistoryRepository extends ElasticsearchRepository<HistoryEntity, String> {
    List<HistoryEntity> findAllByMemberId(String memberId);
}
