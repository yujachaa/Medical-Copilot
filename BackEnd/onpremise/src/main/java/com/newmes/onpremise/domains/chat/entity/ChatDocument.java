package com.newmes.onpremise.domains.chat.entity;

import com.newmes.onpremise.domains.chat.dto.request.ChatRequestDto;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

@AllArgsConstructor
@Data
@Document(indexName = "chats")
@Builder
public class ChatDocument {

  @Id
  String id;

  String reportId;

  int order;

  String comment;

  boolean isQuestion;

  Date regdate;

  String patientId;

  String type;

  String memberId;

  public static ChatDocument from(ChatRequestDto dto){
    return ChatDocument.builder()
        .id(dto.getId())
        .reportId(dto.getReportId())
        .order(dto.getOrder())
        .isQuestion(dto.isQuestion())
        .regdate(dto.getRegdate())
        .patientId(dto.getPatientId())
        .type(dto.getType())
        .memberId(dto.getMemberId())
        .build();
  }
}
