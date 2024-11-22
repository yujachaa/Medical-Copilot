package com.newmes.onpremise.domains.pdf.entity;

import com.newmes.onpremise.domains.pdf.domain.Pdf;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(indexName = "pdf")
public class PdfEntity {

    @Id
    private String id;
    private String reportId;
    private String find;
    private String impression;
    private String plan;

    public static PdfEntity fromDomain(Pdf pdf) {
        return PdfEntity.builder()
                .id(pdf.getId())
                .reportId(pdf.getReportId())
                .find(pdf.getFind())
                .impression(pdf.getImpression())
                .plan(pdf.getPlan())
                .build();
    }

    public Pdf toDomain() {
        return Pdf.builder()
                .id(this.id)
                .reportId(this.reportId)
                .find(this.find)
                .impression(this.impression)
                .plan(this.plan)
                .build();
    }
    public void resetFields() {
        this.find = "";
        this.impression = "";
        this.plan = "";
    }
}
