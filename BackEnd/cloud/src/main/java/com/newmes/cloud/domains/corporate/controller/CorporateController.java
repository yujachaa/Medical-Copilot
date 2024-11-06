package com.newmes.cloud.domains.corporate.controller;

import com.newmes.cloud.domains.corporate.dto.request.CorporateRequestDto;
import com.newmes.cloud.domains.corporate.dto.response.CorporateListResponseDto;
import com.newmes.cloud.domains.corporate.dto.response.CorporateResponseDto;
import com.newmes.cloud.domains.corporate.service.CorporateService;
import com.newmes.cloud.global.util.HttpResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/corporate")
@Slf4j
public class CorporateController {

    private final CorporateService corporateService;
    private final HttpResponseUtil httpResponseUtil;

    @PostMapping
    public ResponseEntity<?> registerCorporate(@RequestBody CorporateRequestDto corporate) {
        try {
            CorporateResponseDto createdCorporate = corporateService.registerCorporate(corporate);
            return httpResponseUtil.createSuccessResponse(createdCorporate, "Corporate registered successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("{corporateKey}")
    public ResponseEntity<?> updateCorporate(
            @PathVariable("corporateKey") String key,
            @RequestBody CorporateRequestDto corporate) {
        try {
            CorporateResponseDto updatedCorporate = corporateService.updateCorporate(key, corporate);
            return httpResponseUtil.createResponse(updatedCorporate);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("{corporateKey}")
    public ResponseEntity<?> getOneCorporate(
            @PathVariable("corporateKey") String key) {
        try {
            CorporateResponseDto corporate = corporateService.getOneCorporate(key);
            return httpResponseUtil.createResponse(corporate);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllCorporates() {
        try {
            List<CorporateListResponseDto> corporates = corporateService.getAllCorporates();
            return httpResponseUtil.createResponse(corporates);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{corporateKey}/init")
    public ResponseEntity<?> initCorporate(@PathVariable("corporateKey") String key) {
        try {
            corporateService.init(key);
            return httpResponseUtil.createSuccessResponse("success", HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PatchMapping("/{corporateKey}/limit")
    public ResponseEntity<?> suspendCorporateKey(@PathVariable("corporateKey") String key) {
        try {
            boolean response = corporateService.suspendCorporateKey(key);
            return httpResponseUtil.createSuccessResponse("success", response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PatchMapping("/{corporateKey}/reissue")
    public ResponseEntity<?> reissueCorporateKey(@PathVariable("corporateKey") String key) {
        try {
            if (key.equals("none")) httpResponseUtil.createSuccessResponse("fail", "none Key");
            String response = corporateService.reissueCorporateKey(key);
            return httpResponseUtil.createSuccessResponse("success", response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{corporateKey}/deleteKey")
    public ResponseEntity<?> deleteCorporateKey(@PathVariable("corporateKey") String key) {
        try {
            corporateService.deleteCorporateKey(key);
            return httpResponseUtil.createSuccessResponse("success", "none");
        } catch (
                Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


}
