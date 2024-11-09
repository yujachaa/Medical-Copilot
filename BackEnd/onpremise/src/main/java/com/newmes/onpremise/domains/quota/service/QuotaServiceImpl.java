package com.newmes.onpremise.domains.quota.service;

import com.newmes.onpremise.domains.quota.dto.QuotaDto;
import com.newmes.onpremise.domains.quota.entity.QuotaEntity;
import com.newmes.onpremise.domains.quota.repository.QuotaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.time.temporal.ChronoUnit;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class QuotaServiceImpl implements QuotaService {

    private final QuotaRepository quotaRepository;

    @Override
    public QuotaEntity createQuota(QuotaEntity entity) {
        return quotaRepository.save(entity);
    }

    @Override
    public QuotaDto getWeeklyCount() {
        OffsetDateTime now = OffsetDateTime.now();
        OffsetDateTime oneWeekAgo = now.minus(1, ChronoUnit.WEEKS);

        Iterable<QuotaEntity> quotas = quotaRepository.findAll();

        long weeklyCount = StreamSupport.stream(quotas.spliterator(), false)
                .filter(quota -> quota != null && quota.getCreateDate() != null)
                .filter(quota -> quota.getCreateDate().isAfter(oneWeekAgo))
                .count();

        return QuotaDto.builder().weeklyCount(weeklyCount).build();
    }

    @Override
    public long getMonthlyCount() {
        OffsetDateTime now = OffsetDateTime.now();
        OffsetDateTime oneMonthAgo = now.minus(1, ChronoUnit.MONTHS);

        Iterable<QuotaEntity> quotas = quotaRepository.findAll();

        return StreamSupport.stream(quotas.spliterator(), false)
                .filter(quota -> quota != null && quota.getCreateDate() != null)
                .filter(quota -> quota.getCreateDate().isAfter(oneMonthAgo))
                .count();
    }

    @Override
    public long getYearlyCount() {
        OffsetDateTime now = OffsetDateTime.now();
        OffsetDateTime oneYearAgo = now.minus(1, ChronoUnit.YEARS);

        Iterable<QuotaEntity> quotas = quotaRepository.findAll();

        return StreamSupport.stream(quotas.spliterator(), false)
                .filter(quota -> quota != null && quota.getCreateDate() != null)
                .filter(quota -> quota.getCreateDate().isAfter(oneYearAgo))
                .count();
    }

    @Override
    public long getTotalCount() {
        Iterable<QuotaEntity> quotas = quotaRepository.findAll();

        return StreamSupport.stream(quotas.spliterator(), false)
                .filter(quota -> quota != null)
                .count();
    }
}
