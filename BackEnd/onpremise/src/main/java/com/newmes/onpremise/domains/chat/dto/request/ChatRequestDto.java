package com.newmes.onpremise.domains.chat.dto.request;

import java.util.Date;
import lombok.Data;

@Data
public class ChatRequestDto {

  String id;

  String reportId;

  int order;

  String comment;

  boolean isQuestion;

  Date regdate;

  String patientId;

  String type;

  String memberId;
}
