package com.newmes.onpremise.domains.report.service;

import com.newmes.onpremise.domains.report.dto.request.ReportRequestDto;
import com.newmes.onpremise.domains.report.dto.response.ReportResponseDto;
import com.newmes.onpremise.domains.report.entity.ReportEntity;
import com.newmes.onpremise.domains.report.exception.ReportNotFoundException;
import com.newmes.onpremise.domains.report.repository.ReportRepository;
import com.newmes.onpremise.global.util.MemberInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

    private final ReportRepository reportRepository;

    @Override
    public String register(ReportRequestDto reportDto) {
        ReportEntity reportEntity = ReportEntity.from(reportDto);
        return reportRepository.save(reportEntity).getId();
    }

    @Override
    @Transactional(readOnly = true)
    public ReportResponseDto readById(String id) {
        ReportEntity reportEntity = reportRepository.findById(id)
                .orElseThrow(() -> new ReportNotFoundException("Report not found"));
        return ReportResponseDto.from(reportEntity);
    }

    @Override
    @Transactional
    public void updateReport(String id, ReportRequestDto updateRequest) {
        ReportEntity reportEntity = reportRepository.findById(id)
                .orElseThrow(() -> new ReportNotFoundException("Report not found"));

        reportEntity.updateFields(updateRequest);
        reportRepository.save(reportEntity);
    }

    @Override
    public List<ReportResponseDto> readBymemberId() {
        String memberId = MemberInfo.getMemberId();
        List<ReportEntity> reportEntities = reportRepository.findAllByMemberId(memberId);

        return reportEntities.stream()
                .map(ReportResponseDto::from)
                .collect(Collectors.toList());
    }
}
