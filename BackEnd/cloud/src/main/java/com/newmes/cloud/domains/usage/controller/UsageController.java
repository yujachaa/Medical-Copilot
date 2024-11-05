package com.newmes.cloud.domains.usage.controller;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.newmes.cloud.domains.usage.dto.request.UsageRequestDto;
import com.newmes.cloud.domains.usage.service.UsageService;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

@RequiredArgsConstructor
@RestController
@RequestMapping("/usage")
public class UsageController {

    private final UsageService usageService;

    final Gson gson = new Gson();

    @PostMapping
    public CompletableFuture<ResponseEntity<String>> registerUsageTest(@RequestBody UsageRequestDto requestDto) {
        return usageService.processAgentUsage(requestDto)
                .orTimeout(10, TimeUnit.SECONDS)
                .thenApply(result -> ResponseEntity.ok(result))
                .exceptionally(e -> {
                    if (e.getCause() instanceof TimeoutException) {
                        return ResponseEntity.status(HttpStatus.REQUEST_TIMEOUT).body("Agent Request Timed Out");
                    }
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Agent Request error");
                });
    }

  @GetMapping("/monthly")
  public String monthlyTotal(){
    Map<String, long[]> agentMap = usageService.monthly();
    String jsonStr = gson.toJson(agentMap);
    return jsonStr;
  }

  @GetMapping("/weekly")
  public String WeeklyTotal(){
    Map<String, long[]> agentMap = usageService.weekly();
    String jsonStr = gson.toJson(agentMap);
    return jsonStr;
  }

  @GetMapping("/yearly")
  public String YearlyTotal(){
    Map<String, long[]> agentMap = usageService.yearly();
    String jsonStr = gson.toJson(agentMap);
    return jsonStr;
  }

  @GetMapping("/total")
  public String total(){
    Map<String, Long> agentMap = usageService.total();
    String jsonStr = gson.toJson(agentMap);
    return jsonStr;
  }

  @GetMapping("/yearly/{key}")
  public String customerYearly(@PathVariable String key){
    Map<String, long[]> agentMap = usageService.customerYearly(key);
    String jsonStr = gson.toJson(agentMap);
    return jsonStr;
  }

  @GetMapping("/monthly/{key}")
  public String customerMonthly(@PathVariable String key){
    Map<String, long[]> agentMap = usageService.customerMonthly(key);
    String jsonStr = gson.toJson(agentMap);
    return jsonStr;
  }

  @GetMapping("/weekly/{key}")
  public String customerWeekly(@PathVariable String key){
    Map<String, long[]> agentMap = usageService.customerWeekly(key);
    String jsonStr = gson.toJson(agentMap);
    return jsonStr;
  }

  @GetMapping("/yearlyTotal/{key}")
  public String customerYearlyTotal(@PathVariable String key){
    Map<String, Long> agentMap = usageService.customerYearlyTotal(key);
    String jsonStr = gson.toJson(agentMap);
    return jsonStr;
  }

  @GetMapping("/monthlyTotal/{key}")
  public String customerMonthlyTotal(@PathVariable String key){
    Map<String, Long> agentMap = usageService.customerMonthlyTotal(key);
    String jsonStr = gson.toJson(agentMap);
    return jsonStr;
  }

  @GetMapping("/weeklyTotal/{key}")
  public String customerWeeklyTotal(@PathVariable String key){
    Map<String, Long> agentMap = usageService.customerWeeklyTotal(key);
    String jsonStr = gson.toJson(agentMap);
    return jsonStr;
  }

}
