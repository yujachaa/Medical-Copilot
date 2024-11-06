package com.newmes.onpremise.domains.chat.dto.request;

public record ChatRequestDto (

  String reportId,

  String comment,

  boolean isQuestion,

  String PID,

  String memberId,

  String agent
){
}
