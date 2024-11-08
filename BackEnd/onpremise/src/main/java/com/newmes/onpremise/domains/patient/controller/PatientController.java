package com.newmes.onpremise.domains.patient.controller;

import com.newmes.onpremise.domains.patient.domain.Modality;
import com.newmes.onpremise.domains.patient.dto.request.PatientRequestDto;
import com.newmes.onpremise.domains.patient.dto.response.PatientResponseDto;
import com.newmes.onpremise.domains.patient.service.PatientService;
import com.newmes.onpremise.global.util.HttpResponseUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/patient")
public class PatientController {

    private final PatientService patientService;
    private final HttpResponseUtil httpResponseUtil;

    @PostMapping("/regist")
    public ResponseEntity<?> registerPatient(@RequestBody PatientRequestDto requestDto) {
        try {
            patientService.registerPatient(requestDto);
            return httpResponseUtil.createSuccessResponse("Patient registered successfully", HttpStatus.OK);
        } catch (Exception e) {
            return httpResponseUtil.errorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to register patient");
        }
    }

    @GetMapping("/search/{query}")
    public ResponseEntity<?> searchPatients(@PathVariable String query) {
        try {
            List<PatientResponseDto> results = patientService.searchPatients(query);
            return httpResponseUtil.createResponse(results);
        } catch (IOException e) {
            return httpResponseUtil.errorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to search patients");
        }
    }

    @GetMapping("/autocomplete/{prefix}")
    public ResponseEntity<?> autocompletePatients(@PathVariable String prefix) {
        try {
            List<String> suggestions = patientService.autocomplete(prefix);
            return httpResponseUtil.createResponse(suggestions);
        } catch (IOException e) {
            return httpResponseUtil.errorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to autocomplete patients");
        }
    }

    @GetMapping("/recent/{page}/{size}")
    public ResponseEntity<?> getRecentPatients(
            @PathVariable("page") int page,
            @PathVariable("size") int size) {
        try {
            Page<PatientResponseDto> results = patientService.getRecentPatients(page, size);
            return httpResponseUtil.createResponse(results);
        } catch (Exception e) {
            e.printStackTrace();
            return httpResponseUtil.errorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to retrieve recent patients");
        }
    }

    @GetMapping("/{PID}/{agent}")
    public ResponseEntity<?> searchPatientImage(@PathVariable("PID") String PID, @PathVariable("agent") Modality agent) {
        try {
            String image = patientService.getImage(PID, agent);
            return httpResponseUtil.createResponse(image);
        } catch (Exception e) {
            return httpResponseUtil.errorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to search patients");
        }
    }
}
