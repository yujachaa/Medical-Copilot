package com.newmes.cloud.domains.corporate.controller;

import com.newmes.cloud.domains.corporate.dto.request.CorporateRequestDto;
import com.newmes.cloud.domains.corporate.dto.response.CorporateDetailResponseDto;
import com.newmes.cloud.domains.corporate.dto.response.CorporateResponseDto;
import com.newmes.cloud.domains.corporate.service.CorporateService;
import com.newmes.cloud.global.util.HttpResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/corporate")
@Slf4j
public class CorporateController {

    private final CorporateService corporateService;
    private final HttpResponseUtil httpResponseUtil;

    @PostMapping
    public ResponseEntity<?> registerCorporate(@RequestBody CorporateRequestDto corporate) {
        CorporateResponseDto createdCorporate = CorporateResponseDto.from(corporateService.registerCorporate(corporate));
        return httpResponseUtil.createSuccessResponse(createdCorporate, "Corporate registered successfully");
    }

    @PutMapping("{corporateKey}")
    public ResponseEntity<?> updateCorporate(
            @PathVariable("corporateKey") String key,
            @RequestBody CorporateRequestDto corporate) {
        CorporateResponseDto updatedCorporate = CorporateResponseDto.from(corporateService.updateCorporate(key, corporate));
        return httpResponseUtil.createResponse(updatedCorporate);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllCorporates() {
        List<CorporateResponseDto> corporates = corporateService.getAllCorporates().stream()
                .map(CorporateResponseDto::from)
                .collect(Collectors.toList());
        return httpResponseUtil.createResponse(corporates);
    }

    @GetMapping("/{corporateKey}")
    public ResponseEntity<?> getCorporateById(@PathVariable("corporateKey") String key) {
        CorporateDetailResponseDto corporate = corporateService.getCorporateDetailWithUsages(key);
        return httpResponseUtil.createResponse(corporate);
    }
}
