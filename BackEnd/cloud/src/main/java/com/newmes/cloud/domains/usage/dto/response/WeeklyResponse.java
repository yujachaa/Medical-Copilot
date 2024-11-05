package com.newmes.cloud.domains.usage.dto.response;

import lombok.Data;

@Data
public class WeeklyResponse {

  long[] Capsule = new long[7];
  long[] CXR = new long[7];
  long[] MG = new long[7];

  public void add(String agentName, long[] counts) {
    switch (agentName) {
      case "Capsule" -> this.Capsule = counts;
      case "CXR" -> this.CXR = counts;
      case "MedGuru" -> this.MG = counts;
    }
  }
}
