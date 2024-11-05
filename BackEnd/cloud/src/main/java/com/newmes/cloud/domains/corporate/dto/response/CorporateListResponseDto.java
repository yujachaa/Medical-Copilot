package com.newmes.cloud.domains.corporate.dto.response;

import com.newmes.cloud.domains.corporate.domain.Corporate;
import com.newmes.cloud.domains.corporate.domain.Grade;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class CorporateListResponseDto {
    private Long id;
    private String comName;
    private Grade grade;
    private String key;
    private Boolean availability;
    private Long totalCount;
    private int Subscription;
    private LocalDate createDate;
    public static CorporateListResponseDto from(Corporate corporate, Long totalCount, int Subscription) {
        return CorporateListResponseDto.builder()
                .id(corporate.getId())
                .comName(corporate.getComName())
                .grade(corporate.getGrade())
                .key(corporate.getKey())
                .availability(corporate.isAvailability())
                .totalCount(totalCount)
                .Subscription(Subscription)
                .createDate(corporate.getCreateDate())
                .build();
    }
}
