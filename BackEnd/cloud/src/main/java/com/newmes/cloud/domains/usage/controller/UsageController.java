package com.newmes.cloud.domains.usage.controller;

import com.newmes.cloud.domains.usage.dto.request.UsageRequestDto;
import com.newmes.cloud.domains.usage.dto.response.CountResponse;
import com.newmes.cloud.domains.usage.dto.response.MonthlyResponse;
import com.newmes.cloud.domains.usage.dto.response.WeeklyResponse;
import com.newmes.cloud.domains.usage.dto.response.YearlyResponse;
import com.newmes.cloud.domains.usage.service.UsageService;
import java.io.IOException;
import java.util.List;
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

  @PostMapping("medical_chat")
  public void usageAgent(@RequestBody UsageRequestDto requestDto) {
      usageService.CountAgent(requestDto);
  }

  @GetMapping("/monthly")
  public ResponseEntity<?> monthlyTotal(){
    MonthlyResponse monthlyResponse = null;
    try {
      monthlyResponse = usageService.monthly();
    } catch (IOException e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }
    return ResponseEntity.status(HttpStatus.OK).body(monthlyResponse);
  }

  @GetMapping("/weekly")
  public ResponseEntity<?> WeeklyTotal(){
    WeeklyResponse weeklyResponse = null;
    try {
      weeklyResponse = usageService.weekly();
    } catch (IOException e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }
    return ResponseEntity.status(HttpStatus.OK).body(weeklyResponse);
  }

  @GetMapping("/yearly")
  public ResponseEntity<?> YearlyTotal() {
    YearlyResponse yearlyResponse = null;
    try {
      yearlyResponse = usageService.yearly();
    } catch (IOException e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }
    return ResponseEntity.status(HttpStatus.OK).body(yearlyResponse);
  }

  @GetMapping("/total")
  public ResponseEntity<?> total(){
    CountResponse response = null;
    try {
      response = usageService.total();
    } catch (IOException e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

  @GetMapping("/yearly/{key}")
  public ResponseEntity<?> customerYearly(@PathVariable String key){
    YearlyResponse yearlyResponse = null;
    try {
      yearlyResponse = usageService.customerYearly(key);
    } catch (IOException e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }
    return ResponseEntity.status(HttpStatus.OK).body(yearlyResponse);
  }

  @GetMapping("/monthly/{key}")
  public ResponseEntity<?> customerMonthly(@PathVariable String key){
    MonthlyResponse monthlyResponse = null;
    try {
      monthlyResponse = usageService.customerMonthly(key);
    } catch (IOException e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }
    return ResponseEntity.status(HttpStatus.OK).body(monthlyResponse);
  }

  @GetMapping("/weekly/{key}")
  public ResponseEntity<?> customerWeekly(@PathVariable String key){
    WeeklyResponse weeklyResponse = null;
    try {
      weeklyResponse = usageService.customerWeekly(key);
    } catch (IOException e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }
    return ResponseEntity.status(HttpStatus.OK).body(weeklyResponse);
  }

  @GetMapping("/yearlyTotal/{key}")
  public ResponseEntity<?> customerYearlyTotal(@PathVariable String key){
    CountResponse response = null;
    try {
      response = usageService.customerYearlyTotal(key);
    } catch (IOException e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

  @GetMapping("/monthlyTotal/{key}")
  public ResponseEntity<?> customerMonthlyTotal(@PathVariable String key){
    CountResponse response = null;
    try {
      response = usageService.customerMonthlyTotal(key);
    } catch (IOException e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

  @GetMapping("/weeklyTotal/{key}")
  public ResponseEntity<?> customerWeeklyTotal(@PathVariable String key){
    CountResponse response = null;
    try {
      response = usageService.customerWeeklyTotal(key);
    } catch (IOException e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

  @GetMapping("/token/{key}")
  public ResponseEntity<?> weeklyTokenUsage(@PathVariable String key){
    try {
      long response = usageService.weeklyTokenCount(key);
      return ResponseEntity.status(HttpStatus.OK).body(response);
    } catch (IOException e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }
  }

  @GetMapping("quota/{key}")
  public ResponseEntity<?> quota(@PathVariable String key){
    try {
      long response = usageService.getQuota(key);
      return ResponseEntity.status(HttpStatus.OK).body(response);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }
  }

}
