package com.newmes.cloud.domains.corporate.repository;

import com.newmes.cloud.domains.corporate.entity.CorporateEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CorporateRepository extends JpaRepository<CorporateEntity, Long> {
}
