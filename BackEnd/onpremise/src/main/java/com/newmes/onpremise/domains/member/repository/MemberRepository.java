package com.newmes.onpremise.domains.member.repository;

import com.newmes.onpremise.domains.member.entity.MemberEntity;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.Optional;

public interface MemberRepository extends ElasticsearchRepository<MemberEntity, String> {
    Optional<MemberEntity> findByEmail(String email);
    boolean existsByEmail(String email);
}
