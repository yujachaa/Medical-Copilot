package com.newmes.onpremise.domains.report.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.newmes.onpremise.domains.notification.entity.NotificationEntity;
import com.newmes.onpremise.domains.patient.domain.Gender;
import com.newmes.onpremise.domains.report.dto.request.ReportRequestDto;
import jakarta.persistence.Column;
import jakarta.persistence.OneToOne;
import javax.management.Notification;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.DateFormat;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.time.LocalDate;
import java.time.OffsetDateTime;

@AllArgsConstructor
@Getter
@Builder
@Document(indexName = "reports")
@JsonIgnoreProperties(ignoreUnknown = true)
public class ReportEntity {
    @Id
    private String id;
    private String PID;
    private String imageUrl;

    @Field(type = FieldType.Date, format = DateFormat.date_time)
    private OffsetDateTime createDate;

    @Field(type = FieldType.Date, format = DateFormat.date_time)
    private OffsetDateTime modifiedDate;

    private String chatId;
    private String memberId;
    @Field(type = FieldType.Date)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate shootingDate;
    private Gender sex;
    private int age;
    private String disease;
    private String location;
    private String size;
    private String symptoms;
    private String summary;
    public static ReportEntity from(ReportRequestDto dto) {
        return ReportEntity.builder()
                .PID(dto.PID())
                .imageUrl(dto.imageUrl())
                .chatId(dto.chatId())
                .memberId(dto.memberId())
                .shootingDate(dto.shootingDate())
                .sex(dto.sex())
                .age(dto.age())
                .disease(dto.disease())
                .location(dto.location())
                .size(dto.size())
                .symptoms(dto.symptoms())
                .summary(dto.summary())
                .createDate(OffsetDateTime.now())
                .modifiedDate(OffsetDateTime.now())
                .build();
    }

    public void updateFields(ReportRequestDto updateRequest) {
        if (updateRequest.disease() != null) {
            this.disease = updateRequest.disease();
        }
        if (updateRequest.location() != null) {
            this.location = updateRequest.location();
        }
        if (updateRequest.size() != null) {
            this.size = updateRequest.size();
        }
        if (updateRequest.symptoms() != null) {
            this.symptoms = updateRequest.symptoms();
        }
        if (updateRequest.summary() != null) {
            this.summary = updateRequest.summary();
        }

        this.modifiedDate = OffsetDateTime.now();
    }
}
