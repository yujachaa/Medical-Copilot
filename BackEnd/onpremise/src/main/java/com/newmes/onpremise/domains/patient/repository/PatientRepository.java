package com.newmes.onpremise.domains.patient.repository;

import com.newmes.onpremise.domains.patient.entity.PatientEntity;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface PatientRepository extends ElasticsearchRepository<PatientEntity, String> {
}
