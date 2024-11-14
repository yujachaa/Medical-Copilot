package com.newmes.onpremise.domains.notification.entity;

import com.newmes.onpremise.domains.notification.dto.request.NotificationRequestDto;
import com.newmes.onpremise.domains.patient.domain.Modality;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.elasticsearch.annotations.DateFormat;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "notification")
public class NotificationEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  private String reportId;

  private String memberId;

  private String PID;

  private Modality modality;

  private boolean isRead;

  @Field(type = FieldType.Date, format = DateFormat.date_time)
  @CreatedDate
  private LocalDateTime createdDate;

  @Field(type = FieldType.Date, format = DateFormat.date_time)
  private LocalDateTime readDate;

  public static NotificationEntity from(NotificationRequestDto notificationDto) {
    return NotificationEntity.builder()
        .id(notificationDto.getId())
        .reportId(notificationDto.getReportId())
        .memberId(notificationDto.getMemberId())
        .PID(notificationDto.getPID())
        .modality(notificationDto.getModality())
        .isRead(notificationDto.isRead())
        .createdDate(notificationDto.getCreatedDate())
        .readDate(notificationDto.getReadDate())
        .build();
  }

  public void updateRead(){
    this.isRead = true;
    readDate = LocalDateTime.now();
  }
}
