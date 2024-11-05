package com.newmes.onpremise.domains.patient.service;

import com.newmes.onpremise.domains.patient.domain.Modality;
import com.newmes.onpremise.domains.patient.domain.Patient;
import com.newmes.onpremise.domains.patient.dto.request.PatientRequestDto;
import com.newmes.onpremise.domains.patient.dto.response.PatientResponseDto;
import com.newmes.onpremise.domains.patient.entity.PatientEntity;
import com.newmes.onpremise.domains.patient.repository.PatientRepository;
import com.newmes.onpremise.domains.patient.repository.PatientRepositoryCustom;
import lombok.RequiredArgsConstructor;
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
    public List<PatientResponseDto> searchPatients(String query) throws IOException {
        return patientRepositoryCustom.searchPatientsByKeyword(query)
                .stream()
                .collect(Collectors.groupingBy(
                        patient -> patient.getPID() + "_" + patient.getVisitDate(),
                        Collectors.toList()
                ))
                .entrySet().stream()
                .filter(entry -> !entry.getValue().isEmpty())
                .map(entry -> {
                    String[] keys = entry.getKey().split("_");
                    String pid = keys[0];
                    LocalDate visitDate = LocalDate.parse(keys[1]);

                    List<PatientEntity> patients = entry.getValue();

                    String sex = patients.get(0).getSex().toString();
                    int age = patients.get(0).getAge();
                    String parsedModality = parseModality(
                            patients.stream().map(PatientEntity::getModality).collect(Collectors.toList())
                    );

                    return PatientResponseDto.builder()
                            .PID(pid)
                            .sex(sex)
                            .age(age)
                            .modality(parsedModality)
                            .visitDate(visitDate)
                            .build();
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<String> autocomplete(String prefix) throws IOException {
        return patientRepositoryCustom.autocompletePatients(prefix).stream()
                .map(PatientEntity::getPID)
                .collect(Collectors.toList());
    }

    @Override
    public Page<PatientResponseDto> getRecentPatients(int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("visitDate").descending());
        return patientRepository.findAll(pageRequest)
                .map(patient -> {
                    String parsedModality = parseModality(List.of(patient.getModality()));
                    return PatientResponseDto.from(Patient.from(patient), parsedModality);
                });
    }

    private String parseModality(List<Modality> modalities) {
        if (modalities == null || modalities.isEmpty()) {
            return "No image data";
        }
        return modalities.stream()
                .filter(Objects::nonNull)
                .distinct()
                .sorted()
                .map(Modality::toString)
                .collect(Collectors.joining(", "));
    }
}
