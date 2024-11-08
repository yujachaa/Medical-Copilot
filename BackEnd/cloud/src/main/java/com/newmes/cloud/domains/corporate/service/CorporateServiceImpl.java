package com.newmes.cloud.domains.corporate.service;

import com.newmes.cloud.domains.corporate.domain.Corporate;
import com.newmes.cloud.domains.corporate.dto.request.CorporateRequestDto;
import com.newmes.cloud.domains.corporate.dto.response.CorporateListResponseDto;
import com.newmes.cloud.domains.corporate.dto.response.CorporateResponseDto;
import com.newmes.cloud.domains.corporate.entity.CorporateEntity;
import com.newmes.cloud.domains.corporate.exception.CorporateNotFoundException;
import com.newmes.cloud.domains.corporate.repository.CorporateRepository;
import com.newmes.cloud.domains.usage.entity.UsageEntity;
import com.newmes.cloud.domains.usage.repository.UsageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.IsoFields;
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
    public void init(String key) {
        UsageEntity entity = usageRepository.findByCorporateKey(key)
                .orElseThrow(() -> new CorporateNotFoundException("Key: " + key));
        entity.initAgentCount();

        usageRepository.save(entity);
    }

    @Override
    @Transactional(readOnly = true)
    public CorporateResponseDto getOneCorporate(String key) {
        CorporateEntity entity = corporateRepository.findByKey(key)
                .orElseThrow(() -> new CorporateNotFoundException("Key: " + key));

        return CorporateResponseDto.from(Corporate.fromEntity(entity));
    }

    @Override
    @Transactional(readOnly = true)
    public List<CorporateListResponseDto> getAllCorporates() {
        List<UsageEntity> usageEntities = usageRepository.findAll();

        LocalDate today = LocalDate.now();

        return usageEntities.stream()
                .map(usage -> {
                    CorporateEntity corporate = usage.getCorporate();
                    Long totalCount = (long) usage.getAgentCount();
                    int subscription = today.get(IsoFields.WEEK_OF_WEEK_BASED_YEAR)
                            - corporate.getModifiedDate().get(IsoFields.WEEK_OF_WEEK_BASED_YEAR);

                    return CorporateListResponseDto.from(
                            Corporate.fromEntity(corporate),
                            totalCount,
                            subscription+1
                    );
                })
                .collect(Collectors.toList());
    }


    @Override
    @Transactional
    public boolean suspendCorporateKey(String key) {
        CorporateEntity entity = corporateRepository.findByKey(key)
                .orElseThrow(() -> new CorporateNotFoundException("Key: " + key));

        entity.limitAvailability();
        corporateRepository.save(entity);
        boolean response = entity.isAvailability();

        return response;
    }

    @Override
    @Transactional
    public String reissueCorporateKey(String key) {
        UsageEntity entity = usageRepository.findByCorporateKey(key).orElseThrow(() -> new CorporateNotFoundException("Key: " + key));

        String newKey = UUID.randomUUID().toString();

        entity.updateKey(newKey);
        entity.getCorporate().updateKey(newKey);

        UsageEntity updatedEntity = usageRepository.save(entity);

        return CorporateResponseDto.from(Corporate.fromEntity(updatedEntity.getCorporate())).getKey();
    }

    @Override
    @Transactional
    public void deleteCorporateKey(String key) {
        CorporateEntity entity = corporateRepository.findByKey(key)
                .orElseThrow(() -> new CorporateNotFoundException("Key: " + key));

        entity.updateKey(null);
        corporateRepository.save(entity);
    }
}
