package com.newmes.onpremise.domains.patient.repository;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import co.elastic.clients.elasticsearch.core.search.Hit;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.newmes.onpremise.domains.patient.entity.PatientEntity;
import com.newmes.onpremise.global.elastic.ElasticException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
@Slf4j
@Service
@RequiredArgsConstructor
public class PatientRepositoryImpl implements PatientRepositoryCustom {

    private final ElasticsearchClient elasticsearchClient;
    private final ObjectMapper objectMapper;

    public List<PatientEntity> searchPatientsByKeyword(String keyword) {
        try {
            Query query = Query.of(q -> q
                    .multiMatch(m -> m
                            .query(keyword)
                            .fields("*")
                    )
            );

            SearchResponse<PatientEntity> searchResponse = elasticsearchClient.search(s -> s
                            .index("patients")
                            .query(query),
                    PatientEntity.class
            );

            return searchResponse.hits().hits().stream()
                    .map(Hit::source)
                    .collect(Collectors.toList());

        } catch (IOException e) {
            throw new ElasticException("Elasticsearch operation failed", e);
        }
    }

    public List<PatientEntity> autocompletePatients(String prefix) {
        try {
            Query query = Query.of(q -> q.match(m -> m
                    .field("PID")
                    .query(prefix)
            ));

            SearchResponse<PatientEntity> searchResponse = elasticsearchClient.search(s -> s
                            .index("patients")
                            .query(query)
                            .size(10),
                    PatientEntity.class
            );
            return searchResponse.hits().hits().stream()
                    .map(hit -> {
                        if (hit.source() != null) {
                            return objectMapper.convertValue(hit.source(), PatientEntity.class);
                        } else {
                            log.warn("Warning: Hit source is null for hit ID: {}", hit.id());
                            return null;
                        }
                    })
                    .filter(Objects::nonNull)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new ElasticException("Elasticsearch operation failed", e);
        }
    }

}
