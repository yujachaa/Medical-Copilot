package com.newmes.onpremise.domains.report.controller;

import com.newmes.onpremise.domains.report.dto.request.ReportRequestDto;
import com.newmes.onpremise.domains.report.dto.response.ReportResponseDto;
import com.newmes.onpremise.domains.report.service.ReportService;
import com.newmes.onpremise.global.util.HttpResponseUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("report")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;
    private final HttpResponseUtil responseUtil;

    @PostMapping("/add")
    public ResponseEntity<Map<String, Object>> registerReport(@RequestBody ReportRequestDto reportDto) {
        reportService.register(reportDto);
        return responseUtil.createSuccessResponse("Report successfully registered", HttpStatus.CREATED.value());
    }

    @GetMapping("/{reportId}")
    public ResponseEntity<Map<String, Object>> getReport(@PathVariable("reportId") String id) {
        ReportResponseDto report = reportService.readById(id);
        return responseUtil.createResponse(report);
    }

    @PatchMapping("/{reportId}")
    public ResponseEntity<Map<String, Object>> updateReport(@PathVariable("reportId") String id, @RequestBody ReportRequestDto updateRequest) {
        reportService.updateReport(id, updateRequest);
        return responseUtil.createSuccessResponse("Report successfully updated", HttpStatus.OK.value());
    }

    @GetMapping("/member")
    public ResponseEntity<Map<String, Object>> getReportByMember() {
        List<ReportResponseDto> reports = reportService.readBymemberId() ;
        return responseUtil.createResponse(reports);
    }
}
