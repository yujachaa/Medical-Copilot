package com.newmes.onpremise.domains.report.controller;

import com.newmes.onpremise.domains.report.dto.request.CommentRequestDto;
import com.newmes.onpremise.domains.report.dto.request.ReportRequestDto;
import com.newmes.onpremise.domains.report.dto.request.UpdateSummaryRequestDto;
import com.newmes.onpremise.domains.report.service.ReportService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/report")
public class ReportController {

  private final ReportService reportService;

  public ReportController(ReportService reportService) {
    this.reportService = reportService;
  }


  @GetMapping("/{id}")
  public void getReport(@PathVariable String id){
      reportService.getReport(id);
  }

  @PatchMapping("/{id}/comment")
  public void addComment(@PathVariable String id, @RequestBody CommentRequestDto commentDto){
      reportService.addComment(commentDto);
  }

  @PatchMapping("/{id}")
  public void updateSummary(@PathVariable String id, @RequestBody UpdateSummaryRequestDto updateSummaryDto){
      reportService.update(updateSummaryDto);
  }

  @PostMapping("/add")
  public void postReport(@RequestBody ReportRequestDto reportDto){
      reportService.addReport(reportDto);
  }
}
