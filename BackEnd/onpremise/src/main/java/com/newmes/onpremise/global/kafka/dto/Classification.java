package com.newmes.onpremise.global.kafka.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Classification {
    private String predictedClass;
    private double confidence;
}
