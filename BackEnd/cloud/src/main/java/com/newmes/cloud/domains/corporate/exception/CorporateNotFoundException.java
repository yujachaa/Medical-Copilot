package com.newmes.cloud.domains.corporate.exception;

import org.springframework.http.HttpStatus;

public class CorporateNotFoundException extends RuntimeException {

    private final HttpStatus status;
    private final String msg;

    public CorporateNotFoundException(String comName) {
        this.status = HttpStatus.NOT_FOUND;
        this.msg = "해당 회사를 찾을 수 없습니다. 회사명: " + comName;
    }
}
