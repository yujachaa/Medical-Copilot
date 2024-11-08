package com.newmes.onpremise.domains.notification.dto.request;

import com.newmes.onpremise.domains.report.entity.ReportEntity;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Data;

@Data
public class NotificationUpdateRequest {

  private int notificationId;

  private String memberId;

  private ReportEntity report;

  private boolean read;

  private LocalDateTime readDate = LocalDateTime.now();
}
