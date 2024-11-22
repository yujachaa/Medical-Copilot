package com.newmes.cloud.domains.corporate.repository;

import com.newmes.cloud.domains.corporate.entity.CorporateEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CorporateRepository extends JpaRepository<CorporateEntity, Long> {
    Optional<CorporateEntity> findByKey(String key);
}
