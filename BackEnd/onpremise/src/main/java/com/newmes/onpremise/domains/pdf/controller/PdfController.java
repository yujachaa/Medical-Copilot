package com.newmes.onpremise.domains.pdf.controller;

import com.newmes.onpremise.domains.pdf.domain.Pdf;
import com.newmes.onpremise.domains.pdf.service.PdfService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("pdf")
@RequiredArgsConstructor
public class PdfController {

    private final PdfService pdfService;

    @PostMapping
    public ResponseEntity<Pdf> register(@RequestBody Pdf pdf) {
        Pdf registeredPdf = pdfService.register(pdf);
        return ResponseEntity.ok(registeredPdf);
    }

    @PatchMapping("/reset/{reportId}")
    public ResponseEntity<Pdf> reset(@PathVariable("reportId") String id) {
        Pdf resetPdf = pdfService.reset(id);
        return ResponseEntity.ok(resetPdf);
    }

    @GetMapping("/{reportId}")
    public ResponseEntity<Pdf> findByReportId(@PathVariable("reportId") String reportId) {
        Pdf pdf = pdfService.findByReportId(reportId);
        return ResponseEntity.ok(pdf);
    }
}
