package com.newmes.onpremise.global.elastic;

public class ElasticException extends RuntimeException {
    public ElasticException(String message, Throwable cause) {
        super(message, cause);
    }

    public ElasticException(String message) {
        super(message);
    }
}
