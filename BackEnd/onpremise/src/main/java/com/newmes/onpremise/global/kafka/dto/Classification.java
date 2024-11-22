package com.newmes.onpremise.global.kafka.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Classification {
    @JsonProperty("Predicted_Class")
    private String predictedClass;

    @JsonProperty("Confidence")
    private double confidence;
}
