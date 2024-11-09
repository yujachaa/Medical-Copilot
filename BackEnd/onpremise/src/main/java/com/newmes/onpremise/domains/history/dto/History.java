package com.newmes.onpremise.domains.history.dto;

import com.newmes.onpremise.domains.patient.domain.Gender;

import java.time.OffsetDateTime;

public record History(
        String PID,
        Gender sex,
        int age,
        String summary,
        String memberId,
        OffsetDateTime recentDate
) {}
