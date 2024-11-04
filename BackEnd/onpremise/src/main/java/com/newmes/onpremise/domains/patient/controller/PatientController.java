package com.newmes.onpremise.domains.patient.controller;

import com.newmes.onpremise.domains.patient.dto.PatientResponseDto;
import com.newmes.onpremise.domains.patient.service.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/patient")
public class PatientController {

    private final PatientService patientService;

    @GetMapping("/search/{query}")
    public List<PatientResponseDto> searchPatients(@PathVariable String query) throws IOException{
        return patientService.searchPatients(query);
    }

    @GetMapping("/autocomplete/{prefix}")
    public List<String> autocompletePatients(@PathVariable String prefix) throws IOException {
        return patientService.autocomplete(prefix);
    }

    @GetMapping("/recent/{page}/{size}")
    public Page<PatientResponseDto> getRecentPatients(
            @PathVariable("page") int page,
            @PathVariable("size") int size) {
        return patientService.getRecentPatients(page, size);
    }
}
