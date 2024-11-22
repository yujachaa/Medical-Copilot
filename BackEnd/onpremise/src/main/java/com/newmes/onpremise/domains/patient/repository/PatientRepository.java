package com.newmes.onpremise.domains.patient.repository;

import com.newmes.onpremise.domains.patient.domain.Modality;
import com.newmes.onpremise.domains.patient.entity.PatientEntity;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.Optional;

public interface PatientRepository extends ElasticsearchRepository<PatientEntity, String> {
    Optional<PatientEntity> findFirstByPIDAndModalityOrderByVisitDateDesc(String pid, Modality modality);
}
