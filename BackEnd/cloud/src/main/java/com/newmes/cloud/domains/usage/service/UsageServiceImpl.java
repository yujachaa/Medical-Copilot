package com.newmes.cloud.domains.usage.service;

import com.newmes.cloud.domains.corporate.domain.Corporate;
import com.newmes.cloud.domains.corporate.entity.CorporateEntity;
import com.newmes.cloud.domains.corporate.exception.CorporateNotFoundException;
import com.newmes.cloud.domains.corporate.repository.CorporateRepository;
import com.newmes.cloud.domains.usage.domain.AgentType;
import com.newmes.cloud.domains.usage.dto.request.UsageRequestDto;
import com.newmes.cloud.domains.usage.dto.response.TotalUsageResponseDto;
import com.newmes.cloud.domains.usage.dto.response.UsageResponseDto;
import com.newmes.cloud.domains.usage.entity.UsageEntity;
import com.newmes.cloud.domains.usage.repository.UsageRepository;
import com.newmes.cloud.domains.usage.domain.Usage;
import com.newmes.cloud.domains.usage.exception.UsageNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class UsageServiceImpl implements UsageService {

    private final UsageRepository usageRepository;
    private final CorporateRepository corporateRepository;

    @Override
    @Transactional
    public UsageResponseDto registerUsage(UsageRequestDto requestDto) {
        CorporateEntity corporateEntity = corporateRepository.findByKey(requestDto.key())
                .orElseThrow(() -> new CorporateNotFoundException("Key: " + requestDto.key()));
        Corporate corporate = Corporate.fromEntity(corporateEntity);

        long maxUsageCount;
        switch (corporate.getGrade()) {
            case SILVER -> maxUsageCount = 100;
            case GOLD -> maxUsageCount = 200;
            case PLATINUM -> maxUsageCount = 500;
            default -> maxUsageCount = 50;
        }

        if (corporate.getTotalCount() >= maxUsageCount) {
            throw new IllegalStateException("등록 실패: " + corporate.getGrade() + " 등급의 최대 사용량 " + maxUsageCount + " 초과");
        }

        Usage usage = requestDto.toUsage(corporate.toEntity());
        UsageEntity entity = UsageEntity.fromDomain(usage);
        entity.updateEntity(corporateEntity);
        UsageEntity savedEntity = usageRepository.save(entity);
        updateCount(requestDto.key(), requestDto.agent());
        return UsageResponseDto.fromDomain(Usage.fromEntity(savedEntity));
    }

    @Override
    @Transactional(readOnly = true)
    public TotalUsageResponseDto getTotalUsage() {
        List<UsageEntity> allUsageEntities = usageRepository.findAll();

        Long totalUsage = (long) allUsageEntities.size();
        Long madGuruUsage = allUsageEntities.stream()
                .filter(usage -> usage.getAgent() == AgentType.MedGuru)
                .count();
        Long cxrUsage = allUsageEntities.stream()
                .filter(usage -> usage.getAgent() == AgentType.CXR)
                .count();
        Long capsuleUsage = allUsageEntities.stream()
                .filter(usage -> usage.getAgent() == AgentType.Capsule)
                .count();

        return new TotalUsageResponseDto(totalUsage, madGuruUsage, cxrUsage, capsuleUsage);
    }


    @Override
    @Transactional(readOnly = true)
    public List<UsageResponseDto> getAllUsageByCorporateId(String key) {
        List<UsageEntity> usageEntities = usageRepository.findByCorporateKey(key);
        return usageEntities.stream()
                .map(Usage::fromEntity)
                .map(UsageResponseDto::fromDomain)
                .toList();
    }

    @Transactional(readOnly = true)
    void updateCount(String key, AgentType agent) {
        CorporateEntity entity = corporateRepository.findByKey(key)
                .orElseThrow(() -> new CorporateNotFoundException("Key: " + key));
        entity.incrementUsageCount(agent);
        corporateRepository.save(entity);
    }


    @Transactional(readOnly = true)
    Corporate getCorporate(String key) {
        return corporateRepository.findByKey(key)
                .map(Corporate::fromEntity)
                .orElseThrow(() -> new CorporateNotFoundException("Key: " + key));
    }

}
