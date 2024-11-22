package com.newmes.onpremise.domains.quota.service;

import com.newmes.onpremise.domains.quota.dto.QuotaDto;
import com.newmes.onpremise.domains.quota.entity.QuotaEntity;

public interface QuotaService {
    QuotaEntity createQuota(QuotaEntity entity);
    QuotaDto getWeeklyCount();
    long getMonthlyCount();
    long getYearlyCount();
    long getTotalCount();
}
