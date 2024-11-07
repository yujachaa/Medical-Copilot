package com.newmes.onpremise.domains.report.repository;

import com.newmes.onpremise.domains.report.entity.ReportEntity;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

public interface ReportRepository extends ElasticsearchRepository<ReportEntity, String> {
    List<ReportEntity> findAllByMemberId(String memberId);
}
