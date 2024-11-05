package com.newmes.cloud.domains.usage.controller;

import com.google.gson.Gson;
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
  public ResponseEntity<MonthlyResponse> monthlyTotal(){
    MonthlyResponse monthlyResponse = null;
    try {
      monthlyResponse = usageService.monthly();
    } catch (IOException e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }
    return ResponseEntity.status(HttpStatus.OK).body(monthlyResponse);
  }

  @GetMapping("/weekly")
  public ResponseEntity<WeeklyResponse> WeeklyTotal(){
    WeeklyResponse weeklyResponse = null;
    try {
      weeklyResponse = usageService.weekly();
    } catch (IOException e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }
    return ResponseEntity.status(HttpStatus.OK).body(weeklyResponse);
  }

  @GetMapping("/yearly")
  public ResponseEntity<YearlyResponse> YearlyTotal() {
    YearlyResponse yearlyResponse = null;
    try {
      yearlyResponse = usageService.yearly();
    } catch (IOException e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }
    return ResponseEntity.status(HttpStatus.OK).body(yearlyResponse);
  }

  @GetMapping("/total")
  public ResponseEntity<List<CountResponse>> total(){
    List<CountResponse> list = null;
    try {
      list = usageService.total();
    } catch (IOException e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }
    return ResponseEntity.status(HttpStatus.OK).body(list);
  }

  @GetMapping("/yearly/{key}")
  public ResponseEntity<YearlyResponse> customerYearly(@PathVariable String key){
    YearlyResponse yearlyResponse = null;
    try {
      yearlyResponse = usageService.customerYearly(key);
    } catch (IOException e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }
    return ResponseEntity.status(HttpStatus.OK).body(yearlyResponse);
  }

  @GetMapping("/monthly/{key}")
  public ResponseEntity<MonthlyResponse> customerMonthly(@PathVariable String key){
    MonthlyResponse monthlyResponse = null;
    try {
      monthlyResponse = usageService.customerMonthly(key);
    } catch (IOException e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }
    return ResponseEntity.status(HttpStatus.OK).body(monthlyResponse);
  }

  @GetMapping("/weekly/{key}")
  public ResponseEntity<WeeklyResponse> customerWeekly(@PathVariable String key){
    WeeklyResponse weeklyResponse = null;
    try {
      weeklyResponse = usageService.customerWeekly(key);
    } catch (IOException e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }
    return ResponseEntity.status(HttpStatus.OK).body(weeklyResponse);
  }

  @GetMapping("/yearlyTotal/{key}")
  public ResponseEntity<List<CountResponse>> customerYearlyTotal(@PathVariable String key){
    List<CountResponse> list = null;
    try {
      list = usageService.customerYearlyTotal(key);
    } catch (IOException e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }
    return ResponseEntity.status(HttpStatus.OK).body(list);
  }

  @GetMapping("/monthlyTotal/{key}")
  public ResponseEntity<List<CountResponse>> customerMonthlyTotal(@PathVariable String key){
    List<CountResponse> list = null;
    try {
      list = usageService.customerMonthlyTotal(key);
    } catch (IOException e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }
    return ResponseEntity.status(HttpStatus.OK).body(list);
  }

  @GetMapping("/weeklyTotal/{key}")
  public ResponseEntity<List<CountResponse>> customerWeeklyTotal(@PathVariable String key){
    List<CountResponse> list = null;
    try {
      list = usageService.customerWeeklyTotal(key);
    } catch (IOException e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }
    return ResponseEntity.status(HttpStatus.OK).body(list);
  }
}
