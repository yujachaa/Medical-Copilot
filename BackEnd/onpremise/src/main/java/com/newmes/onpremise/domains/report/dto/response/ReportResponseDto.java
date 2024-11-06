package com.newmes.onpremise.domains.report.dto.response;

import com.newmes.onpremise.domains.patient.domain.Gender;
import com.newmes.onpremise.domains.report.entity.ReportEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.OffsetDateTime;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReportResponseDto {
    private String id;
    private String PID;
    private String imageUrl;
    private OffsetDateTime createDate;
    private OffsetDateTime modifiedDate;
    private String chatId;
    private String memberId;
    private LocalDate shootingDate;
    private Gender sex;
    private int age;
    private String disease;
    private String location;
    private String size;
    private String symptoms;
    private String summary;

    public static ReportResponseDto from(ReportEntity entity) {
        return ReportResponseDto.builder()
                .id(entity.getId())
                .PID(entity.getPID())
                .imageUrl(entity.getImageUrl())
                .createDate(entity.getCreateDate())
                .modifiedDate(entity.getModifiedDate())
                .chatId(entity.getChatId())
                .memberId(entity.getMemberId())
                .shootingDate(entity.getShootingDate())
                .sex(entity.getSex())
                .age(entity.getAge())
                .disease(entity.getDisease())
                .location(entity.getLocation())
                .size(entity.getSize())
                .symptoms(entity.getSymptoms())
                .summary(entity.getSummary())
                .build();
    }
}
