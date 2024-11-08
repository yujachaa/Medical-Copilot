package com.newmes.onpremise.domains.report.service;

import com.newmes.onpremise.domains.report.dto.request.ReportRequestDto;
import com.newmes.onpremise.domains.report.dto.response.ReportResponseDto;

public interface ReportService {
    String register(ReportRequestDto reportDto);
    ReportResponseDto readById(String id);
    void updateReport(String id, ReportRequestDto updateRequest);
}
