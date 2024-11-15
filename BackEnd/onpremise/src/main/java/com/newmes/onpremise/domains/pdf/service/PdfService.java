package com.newmes.onpremise.domains.pdf.service;

import com.newmes.onpremise.domains.pdf.domain.Pdf;

public interface PdfService {

    Pdf register(Pdf pdf);

    Pdf reset(String id);

    Pdf findByReportId(String reportId);
}
