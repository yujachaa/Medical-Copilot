package com.newmes.onpremise.global.kafka.dto;

import com.newmes.onpremise.domains.patient.domain.Gender;
import com.newmes.onpremise.domains.patient.domain.Modality;
import com.newmes.onpremise.domains.report.domain.Detection;

import java.time.LocalDate;

public record AiResponseDto(
        String PID,
        String image,
        String memberId,
        LocalDate shootingDate,
        Gender sex,
        int age,
        String comment,
        String key,
        String summary,
        Modality agent,
        String answer,
        Classification classification,
        Detection detection
) {
    public record Classification(
            String predictedClass,
            double confidence
    ) {}

}
