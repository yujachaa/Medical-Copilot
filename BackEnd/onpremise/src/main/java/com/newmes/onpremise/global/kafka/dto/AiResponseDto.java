package com.newmes.onpremise.global.kafka.dto;

import com.newmes.onpremise.domains.patient.domain.Gender;
import com.newmes.onpremise.domains.patient.domain.Modality;
import com.newmes.onpremise.domains.report.domain.Detection;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AiResponseDto {
    private String PID;
    private String image;
    private String memberId;
    private LocalDate shootingDate;
    private Gender sex;
    private int age;
    private String comment;
    private String key;
    private String summary;
    private Modality agent;
    private String answer;
    private Classification classification;
    private Detection detection;
}
