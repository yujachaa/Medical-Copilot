package com.newmes.onpremise.domains.member.exception;

import org.springframework.http.HttpStatus;

public class ValidateMemberException extends RuntimeException {
    private final HttpStatus status;
    private final String msg;

    public ValidateMemberException(String email) {
        super("Member not found");
        this.status = HttpStatus.NO_CONTENT;
        this.msg = " 비밀번호가 다릅니다: "+email;
    }
}
