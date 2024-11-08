package com.newmes.onpremise.domains.quota.entity;

import com.newmes.onpremise.domains.patient.domain.Modality;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.DateFormat;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.time.OffsetDateTime;
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(indexName = "quota")
public class QuotaEntity {
    @Id
    private String id;
    @Field(type = FieldType.Date, format = DateFormat.date_time)
    private OffsetDateTime createDate;
    private Modality modality;
}
