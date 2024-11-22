package com.newmes.onpremise.domains.quota.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class QuotaDto {
    private long weeklyCount;
}
