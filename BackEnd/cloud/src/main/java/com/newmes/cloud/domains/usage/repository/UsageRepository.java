package com.newmes.cloud.domains.usage.repository;

import com.newmes.cloud.domains.usage.entity.UsageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UsageRepository extends JpaRepository<UsageEntity, Long> {
    List<UsageEntity> findByCorporateKey(String key);
}
