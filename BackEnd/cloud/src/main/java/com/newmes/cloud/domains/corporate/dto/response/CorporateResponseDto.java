package com.newmes.cloud.domains.corporate.dto.response;

import com.newmes.cloud.domains.corporate.domain.Corporate;
import com.newmes.cloud.domains.corporate.domain.Grade;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class CorporateResponseDto {
    
    private Long id;
    private String comName;
    private Grade grade;
    private String key;
    private Boolean availability;
    private LocalDate createDate;
    public static CorporateResponseDto from(Corporate corporate) {
        return CorporateResponseDto.builder()
                .id(corporate.getId())
                .comName(corporate.getComName())
                .grade(corporate.getGrade())
                .key(corporate.getKey())
                .availability(corporate.isAvailability())
                .createDate(corporate.getCreateDate())
                .build();
    }
}
