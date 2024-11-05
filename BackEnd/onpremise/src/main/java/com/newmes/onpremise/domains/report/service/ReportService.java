package com.newmes.onpremise.domains.report.service;

import com.newmes.onpremise.domains.report.dto.request.CommentRequestDto;
import com.newmes.onpremise.domains.report.dto.request.ReportRequestDto;
import com.newmes.onpremise.domains.report.dto.request.UpdateSummaryRequestDto;

public interface ReportService {

  void getReport(String id);

  void addComment(CommentRequestDto commentDto);

  void update(UpdateSummaryRequestDto updateSummaryDto);

  void addReport(ReportRequestDto reportDto);
}
