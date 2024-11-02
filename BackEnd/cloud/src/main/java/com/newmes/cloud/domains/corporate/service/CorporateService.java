package com.newmes.cloud.domains.corporate.service;

import com.newmes.cloud.domains.corporate.dto.request.CorporateRequestDto;
import com.newmes.cloud.domains.corporate.dto.response.CorporateResponseDto;

import java.util.List;

public interface CorporateService {
    CorporateResponseDto registerCorporate(CorporateRequestDto corporateRequestDto);

    CorporateResponseDto updateCorporate(String key, CorporateRequestDto corporateRequestDto);

    CorporateResponseDto init(String key);
    
    List<CorporateResponseDto> getAllCorporates();
}
