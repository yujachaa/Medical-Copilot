package com.newmes.onpremise.domains.quota.repository;

import com.newmes.onpremise.domains.quota.entity.QuotaEntity;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface QuotaRepository extends ElasticsearchRepository<QuotaEntity, String> {
}
