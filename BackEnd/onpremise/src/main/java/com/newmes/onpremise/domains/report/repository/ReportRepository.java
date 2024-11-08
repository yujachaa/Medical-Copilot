package com.newmes.onpremise.domains.report.repository;

import com.newmes.onpremise.domains.report.entity.ReportEntity;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface ReportRepository extends ElasticsearchRepository<ReportEntity, String> {


}
