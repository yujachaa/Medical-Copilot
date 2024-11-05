package com.newmes.onpremise.domains.report.dto.request;

import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ReportRequestDto {

    String id;

    String patientId;

    String imageUrl;

    String summary;

    String comment;

    Date createDate;

    Date modifiedDate;

    String chatId;

    String memberId;
}
