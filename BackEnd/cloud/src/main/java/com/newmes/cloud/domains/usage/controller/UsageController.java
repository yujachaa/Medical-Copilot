package com.newmes.cloud.domains.usage.controller;

import com.newmes.cloud.domains.usage.dto.request.UsageRequestDto;
import com.newmes.cloud.domains.usage.dto.response.TotalUsageResponseDto;
import com.newmes.cloud.domains.usage.dto.response.UsageResponseDto;
import com.newmes.cloud.domains.usage.service.UsageService;
import com.newmes.cloud.global.util.HttpResponseUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/usage")
public class UsageController {

    private final UsageService usageService;
    private final HttpResponseUtil httpResponseUtil;

    @PostMapping
    public ResponseEntity<UsageResponseDto> registerUsage(
            @RequestBody UsageRequestDto usageRequestDto) {
        UsageResponseDto responseDto = usageService.registerUsage(usageRequestDto);
        return ResponseEntity.ok(responseDto);
    }


    @GetMapping
    public ResponseEntity<Map<String, Object>> getTotalUsage() {
        TotalUsageResponseDto totalUsage = usageService.getTotalUsage();
        return httpResponseUtil.createResponse(totalUsage);
    }
}
