package com.newmes.onpremise.domains.report.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class CommentRequestDto {

  String reportId;

  String comment;
}
