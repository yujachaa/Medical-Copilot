package com.newmes.onpremise.domains.report.dto.request;

import com.newmes.onpremise.domains.patient.domain.Gender;
import com.newmes.onpremise.domains.report.entity.ReportEntity;
import lombok.Builder;

import java.time.LocalDate;

@Builder
public record ReportRequestDto(
        String PID,
        String imageUrl,
        String chatId,
        String memberId,
        LocalDate shootingDate,
        Gender sex,
        int age,
        String disease,
        String location,
        String size,
        String symptoms,
        String summary
) {
}
