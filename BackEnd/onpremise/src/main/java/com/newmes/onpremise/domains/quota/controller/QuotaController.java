package com.newmes.onpremise.domains.quota.controller;

import com.newmes.onpremise.domains.quota.dto.QuotaDto;
import com.newmes.onpremise.domains.quota.entity.QuotaEntity;
import com.newmes.onpremise.domains.quota.service.QuotaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("quota")
@RequiredArgsConstructor
public class QuotaController {

    private final QuotaService quotaService;

    @GetMapping("/weekly-count")
    public ResponseEntity<QuotaDto> getWeeklyCount() {
        QuotaDto weeklyCount = quotaService.getWeeklyCount();
        return ResponseEntity.ok(weeklyCount);
    }
}
