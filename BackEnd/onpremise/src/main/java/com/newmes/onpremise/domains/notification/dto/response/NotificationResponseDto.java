package com.newmes.onpremise.domains.notification.dto.response;

import com.newmes.onpremise.domains.notification.entity.NotificationEntity;
import com.newmes.onpremise.domains.patient.domain.Modality;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class NotificationResponseDto {

  private int id;

  private String reportId;

  private String memberId;

  private String patientId;

  private Modality modality;

  private LocalDateTime createdDate;

  public static NotificationResponseDto of(NotificationEntity entity){
    return NotificationResponseDto.builder()
        .id(entity.getId())
        .reportId(entity.getReportId())
        .memberId(entity.getMemberId())
        .patientId(entity.getPatientId())
        .modality(entity.getModality())
        .createdDate(entity.getCreatedDate())
        .build();
  }

}
