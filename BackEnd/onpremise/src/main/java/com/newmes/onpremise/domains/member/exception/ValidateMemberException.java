package com.newmes.onpremise.domains.member.exception;

import org.springframework.http.HttpStatus;

public class ValidateMemberException extends RuntimeException {
    private final HttpStatus status;
    private final String msg;

    public ValidateMemberException(String email) {
        super("Member not found");
        this.status = HttpStatus.NOT_FOUND;
        this.msg = " 해당 멤버를 찾을 수 없습니다. email: "+email;
    }
}
