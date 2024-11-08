package com.newmes.onpremise.domains.patient.service;

import com.newmes.onpremise.domains.patient.domain.Modality;

public class PatientNotFoundException extends RuntimeException{
    public PatientNotFoundException(String pid, Modality agent) {
    }
}
