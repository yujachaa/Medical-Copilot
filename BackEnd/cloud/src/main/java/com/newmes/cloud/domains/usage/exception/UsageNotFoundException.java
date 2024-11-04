package com.newmes.cloud.domains.usage.exception;

import org.springframework.http.HttpStatus;

public class UsageNotFoundException extends RuntimeException {

    private final HttpStatus status;
    private final String msg;

    public UsageNotFoundException(Long id) {
        this.status = HttpStatus.NOT_FOUND;
        this.msg = "해당 기업의 사용 기록을 찾을 수 없습니다. ID: " + id;
    }
}
