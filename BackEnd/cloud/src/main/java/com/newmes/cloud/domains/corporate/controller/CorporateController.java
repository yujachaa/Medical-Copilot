package com.newmes.cloud.domains.corporate.controller;

import com.newmes.cloud.domains.corporate.dto.request.CorporateRequestDto;
import com.newmes.cloud.domains.corporate.dto.response.CorporateResponseDto;
import com.newmes.cloud.domains.corporate.service.CorporateService;
import com.newmes.cloud.global.util.HttpResponseUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/corporate")
public class CorporateController {

    private final CorporateService corporateService;
    private final HttpResponseUtil httpResponseUtil;

    @PostMapping
    public ResponseEntity<?> registerCorporate(@RequestBody CorporateRequestDto corporate) {
        CorporateResponseDto createdCorporate = CorporateResponseDto.from(corporateService.registerCorporate(corporate));
        return httpResponseUtil.createSuccessResponse(createdCorporate, "Corporate registered successfully");
    }

    @PutMapping("{corporateId}")
    public ResponseEntity<?> updateCorporate(
            @PathVariable("corporateId") Long id,
            @RequestBody CorporateRequestDto corporate) {
        CorporateResponseDto updatedCorporate = CorporateResponseDto.from(corporateService.updateCorporate(id, corporate));
        return httpResponseUtil.createSuccessResponse(updatedCorporate, "Corporate updated successfully");
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllCorporates() {
        List<CorporateResponseDto> corporates = corporateService.getAllCorporates().stream()
                .map(CorporateResponseDto::from)
                .collect(Collectors.toList());
        return httpResponseUtil.createResponse(corporates);
    }

    @GetMapping("/{corporateId}")
    public ResponseEntity<?> getCorporateById(@PathVariable("corporateId") Long id) {
        CorporateResponseDto corporate = CorporateResponseDto.from(corporateService.getCorporateById(id));
        return httpResponseUtil.createResponse(corporate);
    }
}
