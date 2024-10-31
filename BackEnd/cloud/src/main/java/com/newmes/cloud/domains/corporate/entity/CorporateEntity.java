package com.newmes.cloud.domains.corporate.entity;

import com.newmes.cloud.domains.corporate.domain.Grade;
import com.newmes.cloud.domains.usage.domain.AgentType;
import com.newmes.cloud.global.entity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "corporates")
public class CorporateEntity extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String key;

    private String comName;

    @Enumerated(EnumType.STRING)
    private Grade grade;

    private Long cxrCount = 0L;
    private Long capsuleCount = 0L;
    private Long medGuruCount = 0L;
    private Long totalCount = 0L;

    public CorporateEntity(String comName, Grade grade, String key) {
        this.comName = comName;
        this.grade = grade;
        this.key = key;
    }

    public CorporateEntity(String key) {
        this.key = key;
    }

    public void updateCorporateDetails(String comName) {
        this.comName = comName;
    }

    public void updateCorporateGrade(Grade grade) {
        this.grade = grade;
    }

    public void incrementUsageCount(AgentType agentType) {
        switch (agentType) {
            case CXR -> cxrCount++;
            case Capsule -> capsuleCount++;
            case MedGuru -> medGuruCount++;
        }
        totalCount++;
    }
}
