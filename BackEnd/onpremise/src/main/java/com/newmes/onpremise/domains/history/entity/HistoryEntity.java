package com.newmes.onpremise.domains.history.entity;

import com.newmes.onpremise.domains.patient.domain.Gender;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.DateFormat;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import java.time.OffsetDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(indexName = "history")
public class HistoryEntity {
    
    @Id
    private String id;
    
    private String PID;
    private Gender sex;
    private int age;
    private String memberId;
    private String disease;
    private String agent;

    @Field(type = FieldType.Date, format = DateFormat.date_time)
    private OffsetDateTime recentDate;
}
