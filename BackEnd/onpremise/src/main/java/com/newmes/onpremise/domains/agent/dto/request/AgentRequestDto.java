package com.newmes.onpremise.domains.agent.dto.request;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.newmes.onpremise.domains.patient.domain.Gender;
import com.newmes.onpremise.domains.patient.domain.Modality;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AgentRequestDto{
        String PID;
        String image;
        String memberId;
        LocalDate shootingDate;
        Gender sex;
        int age;
        String comment;
        String key;
        Modality agent;
}

