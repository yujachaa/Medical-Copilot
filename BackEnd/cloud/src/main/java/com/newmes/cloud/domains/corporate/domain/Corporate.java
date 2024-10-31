package com.newmes.cloud.domains.corporate.domain;

import com.newmes.cloud.domains.corporate.entity.CorporateEntity;
import lombok.Builder;
import lombok.Getter;

@Getter
public class Corporate {

    private final Long id;
    private final String comName;
    private final Grade grade;
    private final String key;
    private Long cxrCount = 0L;
    private Long capsuleCount = 0L;
    private Long medGuruCount = 0L;
    private Long totalCount = 0L;

    @Builder
    public Corporate(Long id, String comName, Grade grade, String key) {
        this.id = id;
        this.comName = comName;
        this.grade = grade;
        this.key = key;
    }

    public static Corporate fromEntity(CorporateEntity entity) {
        return Corporate.builder()
                .id(entity.getId())
                .comName(entity.getComName())
                .grade(entity.getGrade())
                .key(entity.getKey())
                .build();
    }

    public CorporateEntity toEntity() {
        return new CorporateEntity(comName, grade, key);
    }
}
