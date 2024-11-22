package com.newmes.cloud.domains.corporate.domain;

import com.newmes.cloud.domains.corporate.entity.CorporateEntity;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
@Builder
@Getter
public class Corporate {

    private final Long id;
    private final String comName;
    private final Grade grade;
    private final String key;
    private final boolean availability;
    private final LocalDate createDate;

    public static Corporate fromEntity(CorporateEntity entity) {
        return Corporate.builder()
                .id(entity.getId())
                .comName(entity.getComName())
                .grade(entity.getGrade())
                .key(entity.getKey())
                .availability(entity.isAvailability())
                .createDate(entity.getCreateDate())
                .build();
    }

    public CorporateEntity toEntity() {
        return new CorporateEntity(comName, grade, key);
    }
}
