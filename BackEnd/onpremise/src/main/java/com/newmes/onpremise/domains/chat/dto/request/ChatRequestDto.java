package com.newmes.onpremise.domains.chat.dto.request;

import com.newmes.onpremise.domains.patient.domain.Modality;
import lombok.Builder;

@Builder
public record ChatRequestDto (

  String reportId,

  String comment,

  boolean isQuestion,

  String PID,

  String memberId,

  Modality agent

){
}
