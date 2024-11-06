package com.newmes.cloud.global.kafka.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class UsageResponseDto {

    private String message;
    private boolean isSuccess;
}
