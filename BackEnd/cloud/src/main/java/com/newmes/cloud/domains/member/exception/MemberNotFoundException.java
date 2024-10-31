package com.newmes.cloud.domains.member.exception;


import org.springframework.http.HttpStatus;

public class MemberNotFoundException extends RuntimeException {

    private final HttpStatus status;
    private final String msg;

    public MemberNotFoundException(String name) {
        this.status = HttpStatus.NOT_FOUND;
        this.msg = " 해당 멤버를 찾을 수 없습니다. name: "+name;
    }
}