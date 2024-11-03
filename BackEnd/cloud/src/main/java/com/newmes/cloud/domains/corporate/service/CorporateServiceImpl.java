package com.newmes.cloud.domains.corporate.service;

import com.newmes.cloud.domains.corporate.domain.Corporate;
import com.newmes.cloud.domains.corporate.dto.request.CorporateRequestDto;
import com.newmes.cloud.domains.corporate.dto.response.CorporateResponseDto;
import com.newmes.cloud.domains.corporate.entity.CorporateEntity;
import com.newmes.cloud.domains.corporate.exception.CorporateNotFoundException;
import com.newmes.cloud.domains.corporate.repository.CorporateRepository;
import com.newmes.cloud.domains.usage.entity.UsageEntity;
import com.newmes.cloud.domains.usage.repository.UsageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class CorporateServiceImpl implements CorporateService {

    private final CorporateRepository corporateRepository;
    private final UsageRepository usageRepository;

    @Override
    @Transactional
    public CorporateResponseDto registerCorporate(CorporateRequestDto corporateRequestDto) {
        Corporate corporate = Corporate.builder()
                .comName(corporateRequestDto.comName())
                .grade(corporateRequestDto.grade())
                .key(UUID.randomUUID().toString())
                .build();
        CorporateEntity entity = corporate.toEntity();
        CorporateEntity savedEntity = corporateRepository.save(entity);

        UsageEntity usageEntity = UsageEntity.builder()
                .corporate(savedEntity)
                .agentCount(0)
                .key(corporate.getKey())
                .build();
        usageRepository.save(usageEntity);

        return CorporateResponseDto.from(Corporate.fromEntity(savedEntity));
    }

    @Override
    @Transactional
    public CorporateResponseDto updateCorporate(String key, CorporateRequestDto corporateRequestDto) {
        CorporateEntity entity = corporateRepository.findByKey(key)
                .orElseThrow(() -> new CorporateNotFoundException("Key: " + key));

        if (corporateRequestDto.comName() != null) {
            entity.updateCorporateDetails(corporateRequestDto.comName());
        }
        if (corporateRequestDto.grade() != null) {
            entity.updateCorporateGrade(corporateRequestDto.grade());
        }
        CorporateEntity updatedEntity = corporateRepository.save(entity);

        return CorporateResponseDto.from(Corporate.fromEntity(updatedEntity));
    }

    @Override
    @Transactional
    public CorporateResponseDto init(String key) {
        CorporateEntity entity = corporateRepository.findByKey(key)
                .orElseThrow(() -> new CorporateNotFoundException("Key: " + key));

        CorporateEntity updatedEntity = corporateRepository.save(entity);

        return CorporateResponseDto.from(Corporate.fromEntity(updatedEntity));
    }

    @Override
    @Transactional(readOnly = true)
    public List<CorporateResponseDto> getAllCorporates() {
        return corporateRepository.findAll().stream()
                .map(corporateEntity -> CorporateResponseDto.from(Corporate.fromEntity(corporateEntity)))
                .collect(Collectors.toList());
    }
}
