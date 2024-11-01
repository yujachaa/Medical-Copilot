package com.newmes.cloud.domains.corporate.dto.response;

import com.newmes.cloud.domains.corporate.domain.Corporate;
import com.newmes.cloud.domains.corporate.domain.Grade;
import com.newmes.cloud.domains.usage.dto.response.UsageResponseDto;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class CorporateDetailResponseDto {
    private Long id;
    private String comName;
    private Grade grade;
    private String key;
    private Long cxrCount = 0L;
    private Long capsuleCount = 0L;
    private Long medGuruCount = 0L;
    private Long totalCount = 0L;
    private List<UsageResponseDto> usageList;

    public static CorporateDetailResponseDto from(Corporate corporate, List<UsageResponseDto> usageList) {
        return CorporateDetailResponseDto.builder()
                .id(corporate.getId())
                .comName(corporate.getComName())
                .usageList(usageList)
                .grade(corporate.getGrade())
                .key(corporate.getKey())
                .totalCount(corporate.getTotalCount())
                .capsuleCount(corporate.getCapsuleCount())
                .medGuruCount(corporate.getMedGuruCount())
                .cxrCount(corporate.getCxrCount())
                .build();
    }
}
