package com.newmes.cloud.domains.corporate.service;

import com.newmes.cloud.domains.corporate.domain.Corporate;
import com.newmes.cloud.domains.corporate.dto.request.CorporateRequestDto;
import com.newmes.cloud.domains.corporate.entity.CorporateEntity;
import com.newmes.cloud.domains.corporate.exception.CorporateNotFoundException;
import com.newmes.cloud.domains.corporate.repository.CorporateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class CorporateServiceImpl implements CorporateService {

    private final CorporateRepository corporateRepository;

    @Override
    public Corporate registerCorporate(CorporateRequestDto corporateRequestDto) {
        Corporate corporate = Corporate.builder()
                .comName(corporateRequestDto.comName())
                .build();
        CorporateEntity entity = corporate.toEntity();
        CorporateEntity savedEntity = corporateRepository.save(entity);
        return Corporate.fromEntity(savedEntity);
    }

    @Override
    public Corporate updateCorporate(Long id, CorporateRequestDto corporateRequestDto) {
        CorporateEntity entity = corporateRepository.findById(id)
                .orElseThrow(() -> new CorporateNotFoundException("Corporate not found with id: " + id));

        entity.updateCorporateDetails(corporateRequestDto.comName());
        CorporateEntity updatedEntity = corporateRepository.save(entity);

        return Corporate.fromEntity(updatedEntity);
    }

    @Override
    public Corporate getCorporateById(Long id) {
        CorporateEntity entity = corporateRepository.findById(id)
                .orElseThrow(() -> new CorporateNotFoundException("Corporate not found with id: " + id));
        return Corporate.fromEntity(entity);
    }

    @Override
    public List<Corporate> getAllCorporates() {
        return corporateRepository.findAll().stream()
                .map(Corporate::fromEntity)
                .collect(Collectors.toList());
    }
}
