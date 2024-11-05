package com.newmes.onpremise.domains.report.service;

import com.newmes.onpremise.domains.report.dto.request.CommentRequestDto;
import com.newmes.onpremise.domains.report.dto.request.ReportRequestDto;
import com.newmes.onpremise.domains.report.dto.request.UpdateSummaryRequestDto;
import com.newmes.onpremise.domains.report.entity.ReportDocument;
import com.newmes.onpremise.domains.report.repository.ReportRepository;
import org.springframework.stereotype.Service;

@Service
public class ReportServiceImpl implements ReportService{

  private final ReportRepository reportRepository;

  public ReportServiceImpl(ReportRepository reportRepository) {
    this.reportRepository = reportRepository;
  }

  @Override
  public void getReport(String id) {
      ReportDocument reportDto = reportRepository.findById(id).orElse(null);
  }

  @Override
  public void addComment(CommentRequestDto commentDto) {
    ReportDocument reportDto = reportRepository.findById(commentDto.getReportId()).orElse(null);
      if (reportDto == null){
       return;
      }
      reportDto.setComment(commentDto.getComment());
      reportRepository.save(reportDto);
  }

  @Override
  public void update(UpdateSummaryRequestDto updateSummaryDto) {
    ReportDocument reportDto = reportRepository.findById(updateSummaryDto.getReportId()).orElse(null);
    reportRepository.save(reportDto);
  }

  @Override
  public void addReport(ReportRequestDto reportRequestDto) {
      ReportDocument newDoc = ReportDocument.from(reportRequestDto);
      reportRepository.save(newDoc);
  }
}
