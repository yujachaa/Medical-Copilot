package com.newmes.cloud.domains.member.exception;

import org.springframework.http.HttpStatus;

public class InvalidPasswordException extends RuntimeException {

    private final HttpStatus status;
    private final String msg;

    public InvalidPasswordException() {
        this.status = HttpStatus.UNAUTHORIZED;
        this.msg = "비밀번호가 일치하지 않습니다.";
    }
}
