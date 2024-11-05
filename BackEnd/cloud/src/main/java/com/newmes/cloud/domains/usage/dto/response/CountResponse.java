package com.newmes.cloud.domains.usage.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class CountResponse {

    long MG = 0;
    long CXR = 0;
    long Capsule = 0;

    public void add(String agent, long docCount){
      switch (agent) {
        case "Capsule" -> this.Capsule = docCount;
        case "CXR" -> this.CXR = docCount;
        case "MedGuru" -> this.MG = docCount;
      }
    }
}
