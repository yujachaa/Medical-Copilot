package com.newmes.onpremise.domains.patient.domain;

import com.newmes.onpremise.domains.patient.entity.PatientEntity;
import lombok.Builder;
import lombok.Getter;
import java.time.LocalDate;

@Getter
@Builder
public class Patient {
    private String id;
    private String PID;
    private Gender sex;
    private int age;
    private Modality modality;
    private String image;
    private LocalDate visitDate;

    public static Patient from(PatientEntity entity) {
        return Patient.builder()
                .id(entity.getId())
                .PID(entity.getPID())
                .sex(entity.getSex())
                .age(entity.getAge())
                .modality(entity.getModality())
                .image(entity.getImage())
                .visitDate(entity.getVisitDate())
                .build();
    }
}
