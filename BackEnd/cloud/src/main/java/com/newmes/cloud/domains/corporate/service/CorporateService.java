package com.newmes.cloud.domains.corporate.service;

import com.newmes.cloud.domains.corporate.domain.Corporate;
import com.newmes.cloud.domains.corporate.dto.request.CorporateRequestDto;
import com.newmes.cloud.domains.corporate.dto.response.CorporateDetailResponseDto;

import java.util.List;

public interface CorporateService {
    Corporate registerCorporate(CorporateRequestDto corporateRequestDto);

    Corporate updateCorporate(String key, CorporateRequestDto corporateRequestDto);

    List<Corporate> getAllCorporates();

    CorporateDetailResponseDto getCorporateDetailWithUsages(String key);

}
