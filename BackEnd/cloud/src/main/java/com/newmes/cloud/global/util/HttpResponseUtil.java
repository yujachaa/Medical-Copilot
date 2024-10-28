package com.newmes.cloud.global.util;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class HttpResponseUtil {

    public ResponseEntity<Map<String,Object>> createSuccessResponse(Object msg, Object status){
        Map<String, Object> data = new HashMap<>();
        data.put("msg", msg);
        data.put("status", status);

        Map<String, Object> response = new HashMap<>();
        response.put("data", data);

        return ResponseEntity.ok().body(response);
    }

    public ResponseEntity<Map<String,Object>> createResponse(Object o){
        Map<String, Object> data = new HashMap<>();
        data.put("data", o);
        return ResponseEntity.ok().body(data);
    }

    public ResponseEntity<Map<String, Object>> errorResponse(HttpStatus status, Object o){
        Map<String, Object> data = new HashMap<>();
        data.put("data",o);
        return ResponseEntity.status(status).body(data);
    }
}
