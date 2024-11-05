package com.newmes.cloud.domains.usage.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class CountResponse {

  String agent;

  long docCount;
}
