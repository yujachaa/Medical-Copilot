package com.newmes.onpremise.domains.chat.exception;

import org.springframework.http.HttpStatus;

public class ChatNotFoundException extends RuntimeException {
    private final HttpStatus status;
    private final String msg;

    public ChatNotFoundException(String PID) {
        super("Chat not found");
        this.status = HttpStatus.NO_CONTENT;
        this.msg = " 비밀번호가 다릅니다: "+PID;
    }
}
