package com.newmes.onpremise.domains.report.domain;

import com.newmes.onpremise.domains.report.entity.ReportEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.OffsetDateTime;

@AllArgsConstructor
@Data
@Builder
public class Report {
    private String id;
    private String PID;
    private String image;
    private String summary;
    private String comment;
    private OffsetDateTime createDate;
    private OffsetDateTime modifiedDate;
    private String chatId;
    private String memberId;
    private Detection detection;

    public static Report from(ReportEntity reportDocument) {
        return Report.builder()
                .id(reportDocument.getId())
                .PID(reportDocument.getPID())
                .image(reportDocument.getImage())
                .summary(reportDocument.getSummary())
                .createDate(reportDocument.getCreateDate())
                .modifiedDate(reportDocument.getModifiedDate())
                .chatId(reportDocument.getChatId())
                .memberId(reportDocument.getMemberId())
                .detection(reportDocument.getDetection())
                .build();
    }
}
