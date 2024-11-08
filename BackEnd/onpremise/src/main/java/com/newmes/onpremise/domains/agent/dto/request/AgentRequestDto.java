package com.newmes.onpremise.domains.agent.dto.request;

import com.newmes.onpremise.domains.patient.domain.Gender;
import com.newmes.onpremise.domains.patient.domain.Modality;

import java.time.LocalDate;

public record AgentRequestDto(
        String PID,
        String image,
        String memberId,
        LocalDate shootingDate,
        Gender sex,
        int age,
        String comment,
        String key,
        Modality agent
) {
    public AgentRequestDto withMemberId(String newMemberId) {
        return new AgentRequestDto(PID, image, newMemberId, shootingDate, sex, age, comment, key, agent);
    }
}

