package com.newmes.onpremise.domains.drawing.repository;

import com.newmes.onpremise.domains.drawing.entity.DrawingEntity;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface DrawingRepository extends ElasticsearchRepository<DrawingEntity, String> {
}
