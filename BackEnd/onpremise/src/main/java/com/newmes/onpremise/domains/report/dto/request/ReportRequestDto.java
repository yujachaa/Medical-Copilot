package com.newmes.onpremise.domains.report.dto.request;

import com.newmes.onpremise.domains.patient.domain.Gender;
import com.newmes.onpremise.domains.report.domain.Detection;
import lombok.Builder;

import java.time.LocalDate;

@Builder
public record ReportRequestDto(
        String PID,
        String image,
        String chatId,
        String memberId,
        LocalDate shootingDate,
        Gender sex,
        int age,
        String disease,
        String location,
        String size,
        String symptoms,
        String summary,
        Detection detection  // Detection 필드 추가
) {
}
