package com.newmes.cloud.domains.corporate.domain;

import com.newmes.cloud.domains.corporate.entity.CorporateEntity;
import lombok.Builder;
import lombok.Getter;

@Getter
public class Corporate {

    private final Long id;
    private final String comName;

    @Builder
    public Corporate(Long id, String comName) {
        this.id = id;
        this.comName = comName;
    }

    public static Corporate fromEntity(CorporateEntity entity) {
        return Corporate.builder()
                .id(entity.getId())
                .comName(entity.getComName())
                .build();
    }

    public CorporateEntity toEntity() {
        return new CorporateEntity(comName);
    }
}
