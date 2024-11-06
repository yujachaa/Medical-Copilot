package com.newmes.onpremise.domains.chat.dto.request;

import java.time.LocalDateTime;

public record ChatRequestDto (

  String reportId,

  String comment,

  boolean isQuestion,

  LocalDateTime createDate,

  String patientId,

  String memberId
){
}
