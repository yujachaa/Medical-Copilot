package com.newmes.onpremise.domains.patient.service;

import com.newmes.onpremise.domains.patient.dto.PatientResponseDto;
import org.springframework.data.domain.Page;

import java.io.IOException;
import java.util.List;

public interface PatientService {
    List<PatientResponseDto> searchPatients(String query) throws IOException;
    List<String> autocomplete(String prefix) throws IOException;
    Page<PatientResponseDto> getRecentPatients(int page, int size);
}
