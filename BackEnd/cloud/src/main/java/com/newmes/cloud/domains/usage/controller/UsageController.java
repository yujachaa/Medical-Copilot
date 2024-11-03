package com.newmes.cloud.domains.usage.controller;

import com.newmes.cloud.domains.usage.dto.request.UsageRequestDto;
import com.newmes.cloud.domains.usage.service.UsageService;
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
}
