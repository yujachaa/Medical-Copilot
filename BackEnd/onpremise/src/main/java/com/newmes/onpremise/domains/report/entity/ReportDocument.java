package com.newmes.onpremise.domains.report.entity;

import com.newmes.onpremise.domains.report.dto.request.ReportRequestDto;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

@AllArgsConstructor
@Data
@Builder
@Document(indexName = "reports")
public class ReportDocument {
  @Id
  String id;

  String patientId;

  String imageUrl;

  String summary;

  String comment;

  Date createDate;

  Date modifiedDate;

  String chatId;

  String memberId;

  public static ReportDocument from(ReportRequestDto dto){
    return ReportDocument.builder().id(dto.getId())
        .patientId(dto.getPatientId())
        .imageUrl(dto.getImageUrl())
        .summary(dto.getSummary())
        .comment(dto.getComment())
        .createDate(dto.getCreateDate())
        .modifiedDate(dto.getModifiedDate())
        .chatId(dto.getChatId())
        .memberId(dto.getMemberId())
        .build();
  }
}
