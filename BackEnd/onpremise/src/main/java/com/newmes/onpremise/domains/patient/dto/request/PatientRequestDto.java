package com.newmes.onpremise.domains.patient.dto.request;

import com.newmes.onpremise.domains.patient.domain.Gender;
import com.newmes.onpremise.domains.patient.domain.Modality;
import lombok.Data;
import lombok.Getter;

import java.time.LocalDateTime;

public record PatientRequestDto(
        String PID,
        Gender sex,
        int age,
        Modality modality,
        String image,
        LocalDateTime visitDate
) {
}
