package com.newmes.onpremise.domains.patient.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.newmes.onpremise.domains.patient.domain.Gender;
import com.newmes.onpremise.domains.patient.domain.Modality;
import com.newmes.onpremise.domains.patient.dto.request.PatientRequestDto;
import lombok.*;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.time.LocalDate;
@ToString
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
@Document(indexName = "patients")
public class PatientEntity {
    @Field(type = FieldType.Keyword)
    String id;

    @Field(type = FieldType.Text)
    @JsonProperty("PID")
    String PID;

    @Field(type = FieldType.Keyword)
    Gender sex;

    @Field(type = FieldType.Integer)
    int age;

    @Field(type = FieldType.Keyword)
    Modality modality;

    @Field(type = FieldType.Text, index = false)
    String image;

    @Field(type = FieldType.Date)
    LocalDate visitDate;
    public static PatientEntity fromDto(PatientRequestDto dto) {
        PatientEntity patientEntity = PatientEntity.builder()
                .age(dto.age())
                .PID(dto.PID())
                .sex(dto.sex())
                .modality(dto.modality())
                .build();
        return patientEntity;
    }

    public void updateDate() {
        this.visitDate = LocalDate.now();
    }
}
