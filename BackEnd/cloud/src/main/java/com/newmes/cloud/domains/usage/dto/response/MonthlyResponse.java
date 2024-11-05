package com.newmes.cloud.domains.usage.dto.response;

import lombok.Data;

@Data
public class MonthlyResponse {
  long[] Capsule = new long[5];
  long[] CXR = new long[5];
  long[] MG = new long[5];

  public void add(String agentName, long[] counts) {
    switch (agentName) {
      case "Capsule" -> this.Capsule = counts;
      case "CXR" -> this.CXR = counts;
      case "MedGuru" -> this.MG = counts;
    }
  }
}
