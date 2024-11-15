package com.newmes.onpremise.domains.pdf.repository;

import com.newmes.onpremise.domains.pdf.entity.PdfEntity;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

public interface PdfRepository extends ElasticsearchRepository<PdfEntity, String> {
    Optional<PdfEntity> findByReportId(String reportId);
}
