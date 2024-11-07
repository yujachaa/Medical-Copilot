package com.newmes.onpremise.domains.agent.dto.request;

import com.newmes.onpremise.domains.patient.domain.Gender;
import com.newmes.onpremise.domains.patient.domain.Modality;

import java.time.LocalDate;

public record AgentRequestDto(
        String PID,
        String imageUrl,
        String memberId,
        LocalDate shootingDate,
        Gender sex,
        int age,
        String question,
        String key,
        Modality agent
) {
}
