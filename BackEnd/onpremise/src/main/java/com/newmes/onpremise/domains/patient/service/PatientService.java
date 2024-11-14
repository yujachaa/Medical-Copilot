package com.newmes.onpremise.domains.patient.service;

import com.newmes.onpremise.domains.patient.domain.Modality;
import com.newmes.onpremise.domains.patient.domain.Patient;
import com.newmes.onpremise.domains.patient.dto.request.PatientRequestDto;
import com.newmes.onpremise.domains.patient.dto.response.PatientResponseDto;
import org.springframework.data.domain.Page;

import java.io.IOException;
import java.util.List;

public interface PatientService {
    List<Patient> searchPatients(String query) throws IOException;
    List<String> autocomplete(String prefix) throws IOException;
    Page<Patient> getRecentPatients(int page, int size);
    void registerPatient(PatientRequestDto requestDto);
    String getImage(String pid, Modality agent);

}
