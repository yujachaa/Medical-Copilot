package com.newmes.cloud.domains.usage.dto.response;

import lombok.Data;

@Data
public class AgentAggregationResult {
  private String key;
  private long docCount;
}