package com.newmes.onpremise.domains.notification.dto.request;

import com.newmes.onpremise.domains.notification.entity.NotificationEntity;
import com.newmes.onpremise.domains.patient.domain.Modality;
import com.newmes.onpremise.domains.report.entity.ReportEntity;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NotificationRequestDto {

  private int id;

  private String reportId;

  private String memberId;

  private String patientId;

  private Modality modality;

  private boolean read;

  private LocalDateTime createdDate;

  private LocalDateTime readDate;

  public static NotificationRequestDto of(NotificationEntity entity){
    return NotificationRequestDto.builder()
        .id(entity.getId())
        .reportId(entity.getReportId())
        .memberId(entity.getMemberId())
        .patientId(entity.getPatientId())
        .modality(entity.getModality())
        .read(entity.isRead())
        .createdDate(entity.getCreatedDate())
        .readDate(entity.getReadDate())
        .build();
  }
}
