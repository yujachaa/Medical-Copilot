package com.newmes.onpremise.domains.pdf.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Pdf {

    private String id;
    private String reportId;
    private String find;
    private String impression;
    private String plan;
}
