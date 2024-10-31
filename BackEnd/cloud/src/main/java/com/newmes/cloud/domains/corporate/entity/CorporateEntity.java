package com.newmes.cloud.domains.corporate.entity;

import com.newmes.cloud.global.entity.BaseTimeEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Entity
public class CorporateEntity extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String comName;

    public CorporateEntity(String comName) {
        this.comName = comName;
    }

    public void updateCorporateDetails(String comName) {
        this.comName = comName;
    }
}
