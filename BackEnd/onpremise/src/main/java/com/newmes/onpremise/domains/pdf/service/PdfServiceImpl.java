package com.newmes.onpremise.domains.pdf.service;

import com.newmes.onpremise.domains.pdf.domain.Pdf;
import com.newmes.onpremise.domains.pdf.entity.PdfEntity;
import com.newmes.onpremise.domains.pdf.repository.PdfRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PdfServiceImpl implements PdfService {

    private final PdfRepository pdfRepository;

    @Override
    public Pdf register(Pdf pdf) {
        PdfEntity entity = PdfEntity.fromDomain(pdf);
        PdfEntity savedEntity = pdfRepository.save(entity);
        return savedEntity.toDomain();
    }

    @Override
    public Pdf reset(String id) {
        Optional<PdfEntity> optionalEntity = pdfRepository.findByReportId(id);
        if (optionalEntity.isPresent()) {
            PdfEntity entity = optionalEntity.get();
            entity.resetFields();
            PdfEntity updatedEntity = pdfRepository.save(entity);
            return updatedEntity.toDomain();
        }
        throw new IllegalArgumentException("PDF with id " + id + " not found");
    }

    @Override
    public Pdf findByReportId(String reportId) {
        return pdfRepository.findByReportId(reportId)
                .map(PdfEntity::toDomain)
                .orElseThrow(() -> new IllegalArgumentException("PDF with reportId " + reportId + " not found"));
    }
}
