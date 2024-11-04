package com.newmes.onpremise.domains.patient.entity;

import com.newmes.onpremise.domains.patient.domain.Gender;
import com.newmes.onpremise.domains.patient.domain.Modality;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@Document(indexName = "patients")
public class PatientEntity {
    @Field(type = FieldType.Keyword)
    String id;

    @Field(type = FieldType.Text)
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
    LocalDateTime visitDate;

}
