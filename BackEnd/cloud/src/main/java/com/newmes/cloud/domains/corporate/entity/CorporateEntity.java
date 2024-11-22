package com.newmes.cloud.domains.corporate.entity;

import com.newmes.cloud.domains.corporate.domain.Grade;
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

    @Column(nullable = false)
    private String comName;

    @Enumerated(EnumType.STRING)
    private Grade grade;

    @Column(nullable = false)
    private boolean availability;

    public CorporateEntity(String comName, Grade grade, String key) {
        this.comName = comName;
        this.grade = grade;
        this.key = key;
        this.availability = true;
    }

    public void updateCorporateDetails(String comName) {
        this.comName = comName;
    }

    public void updateCorporateGrade(Grade grade) {
        this.grade = grade;
    }

    public void limitAvailability() {
        this.availability = !this.availability;
    }

    public void updateKey(String newKey) {
        this.key = newKey;
    }
}
