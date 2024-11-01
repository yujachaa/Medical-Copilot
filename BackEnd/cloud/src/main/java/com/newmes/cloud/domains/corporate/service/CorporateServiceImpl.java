package com.newmes.cloud.domains.corporate.service;

import com.newmes.cloud.domains.corporate.domain.Corporate;
import com.newmes.cloud.domains.corporate.dto.request.CorporateRequestDto;
import com.newmes.cloud.domains.corporate.dto.response.CorporateDetailResponseDto;
import com.newmes.cloud.domains.corporate.dto.response.CorporateResponseDto;
import com.newmes.cloud.domains.corporate.entity.CorporateEntity;
import com.newmes.cloud.domains.corporate.exception.CorporateNotFoundException;
import com.newmes.cloud.domains.corporate.repository.CorporateRepository;
import com.newmes.cloud.domains.usage.dto.response.UsageResponseDto;
import com.newmes.cloud.domains.usage.service.UsageService;
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
    private final UsageService usageService;

    @Override
    @Transactional
    public Corporate registerCorporate(CorporateRequestDto corporateRequestDto) {
        Corporate corporate = Corporate.builder()
                .comName(corporateRequestDto.comName())
                .grade(corporateRequestDto.grade())
                .key(UUID.randomUUID().toString())
                .build();
        CorporateEntity entity = corporate.toEntity();
        CorporateEntity savedEntity = corporateRepository.save(entity);
        return Corporate.fromEntity(savedEntity);
    }

    @Override
    @Transactional
    public Corporate updateCorporate(String key, CorporateRequestDto corporateRequestDto) {
        CorporateEntity entity = corporateRepository.findByKey(key)
                .orElseThrow(() -> new CorporateNotFoundException("Key: " + key));

        if(corporateRequestDto.comName() != null) {
            entity.updateCorporateDetails(corporateRequestDto.comName());
        }
        if(corporateRequestDto.grade() != null) {
            entity.updateCorporateGrade(corporateRequestDto.grade());
        }
        CorporateEntity updatedEntity = corporateRepository.save(entity);

        return Corporate.fromEntity(updatedEntity);
    }

    @Override
    @Transactional
    public CorporateResponseDto init(String key){
        CorporateEntity entity = corporateRepository.findByKey(key)
                .orElseThrow(() -> new CorporateNotFoundException("Key: " + key));

        entity.initCount();
        CorporateEntity updatedEntity = corporateRepository.save(entity);

        return CorporateResponseDto.from(Corporate.fromEntity(updatedEntity));
    }


    @Override
    @Transactional(readOnly = true)
    public CorporateDetailResponseDto getCorporateDetailWithUsages(String key) {
        Corporate corporate = Corporate.fromEntity(corporateRepository.findByKey(key)
                .orElseThrow(() -> new CorporateNotFoundException("Key: " + key)));

        List<UsageResponseDto> usageList = usageService.getAllUsageByCorporateId(key);

        return CorporateDetailResponseDto.from(corporate, usageList);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Corporate> getAllCorporates() {
        return corporateRepository.findAll().stream()
                .map(Corporate::fromEntity)
                .collect(Collectors.toList());
    }
}
