package com.newmes.cloud.domains.corporate.service;

import com.newmes.cloud.domains.corporate.dto.request.CorporateRequestDto;
import com.newmes.cloud.domains.corporate.dto.response.CorporateListResponseDto;
import com.newmes.cloud.domains.corporate.dto.response.CorporateResponseDto;

import java.util.List;

public interface CorporateService {
    CorporateResponseDto registerCorporate(CorporateRequestDto corporateRequestDto);

    CorporateResponseDto updateCorporate(String key, CorporateRequestDto corporateRequestDto);

    void init(String key);

    CorporateResponseDto getOneCorporate(String key);

    List<CorporateListResponseDto> getAllCorporates();

    boolean suspendCorporateKey(String key);

    String reissueCorporateKey(String key);

    void deleteCorporateKey(String key);

}
