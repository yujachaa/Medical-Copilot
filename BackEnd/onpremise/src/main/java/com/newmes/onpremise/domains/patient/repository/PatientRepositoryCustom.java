package com.newmes.onpremise.domains.patient.repository;

import com.newmes.onpremise.domains.patient.entity.PatientEntity;

import java.io.IOException;
import java.util.List;

public interface PatientRepositoryCustom {
    List<PatientEntity> searchPatientsByKeyword(String keyword) throws IOException;
    List<PatientEntity> autocompletePatients(String prefix) throws IOException;
}
