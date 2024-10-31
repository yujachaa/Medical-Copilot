package com.newmes.cloud.domains.corporate.dto.response;

import com.newmes.cloud.domains.corporate.domain.Corporate;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CorporateResponseDto {
    
    private Long id;
    private String comName;
    
    public static CorporateResponseDto from(Corporate corporate) {
        return CorporateResponseDto.builder()
                .id(corporate.getId())
                .comName(corporate.getComName())
                .build();
    }
}
