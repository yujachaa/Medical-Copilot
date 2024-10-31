package com.newmes.cloud.domains.corporate.service;

import com.newmes.cloud.domains.corporate.domain.Corporate;
import com.newmes.cloud.domains.corporate.dto.request.CorporateRequestDto;

import java.util.List;

public interface CorporateService {
    Corporate registerCorporate(CorporateRequestDto corporateRequestDto);
    Corporate updateCorporate(Long id, CorporateRequestDto corporateRequestDto);
    List<Corporate> getAllCorporates();
    Corporate getCorporateById(Long id);
}
