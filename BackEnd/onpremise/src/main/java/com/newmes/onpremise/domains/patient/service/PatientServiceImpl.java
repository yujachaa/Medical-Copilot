package com.newmes.onpremise.domains.patient.service;

import com.newmes.onpremise.domains.patient.domain.Modality;
import com.newmes.onpremise.domains.patient.domain.Patient;
import com.newmes.onpremise.domains.patient.dto.request.PatientRequestDto;
import com.newmes.onpremise.domains.patient.dto.response.PatientResponseDto;
import com.newmes.onpremise.domains.patient.entity.PatientEntity;
import com.newmes.onpremise.domains.patient.repository.PatientRepository;
import com.newmes.onpremise.domains.patient.repository.PatientRepositoryCustom;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class PatientServiceImpl implements PatientService {

    private final PatientRepository patientRepository;
    private final PatientRepositoryCustom patientRepositoryCustom;

    @Override
    public void registerPatient(PatientRequestDto requestDto) {
        PatientEntity patientEntity = PatientEntity.fromDto(requestDto);
        patientEntity.updateDate();
        patientRepository.save(patientEntity);
    }

    @Override
    public String getImage(String pid, Modality agent) {
        return patientRepository.findFirstByPIDAndModalityOrderByVisitDateDesc(pid, agent)
                .map(PatientEntity::getImage)
                .orElseThrow(() -> new PatientNotFoundException(pid, agent));
    }
    @Override
    public List<Patient> searchPatients(String query) throws IOException {
        return patientRepositoryCustom.searchPatientsByKeyword(query)
                .stream()
                .map(Patient::from)
                .sorted((p1, p2) -> p2.getVisitDate().compareTo(p1.getVisitDate()))
                .collect(Collectors.toList());
    }




    @Override
    public List<String> autocomplete(String prefix) throws IOException {
        return patientRepositoryCustom.autocompletePatients(prefix).stream()
                .map(PatientEntity::getPID)
                .collect(Collectors.toList());
    }
    @Override
    public Page<Patient> getRecentPatients(int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("visitDate").descending());
        Page<PatientEntity> patientEntities = patientRepository.findAll(pageRequest);

        List<Patient> patients = patientEntities
                .stream()
                .map(Patient::from)
                .collect(Collectors.toList());
        return new PageImpl<>(patients, pageRequest, patientEntities.getTotalElements());
    }




    private String parseModality(List<Modality> modalities) {
        if (modalities == null || modalities.isEmpty()) {
            return "No image data";
        }
        return modalities.stream()
                .filter(Objects::nonNull)
                .filter(modality -> !"MG".equals(modality.toString())) // 'MG' 필터링
                .distinct()
                .sorted()
                .map(Modality::toString)
                .collect(Collectors.joining(", "));
    }

}
