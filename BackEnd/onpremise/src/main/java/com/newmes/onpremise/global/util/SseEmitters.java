package com.newmes.onpremise.global.util;

import com.newmes.onpremise.domains.notification.dto.response.NotificationResponseDto;
import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Component
@Slf4j
public class SseEmitters {

  ConcurrentHashMap<String, SseEmitter> emitters = new ConcurrentHashMap<>();

  public SseEmitter addEmitter(String sessionId) {
    log.error("Adding emitter :id ={}, emitters : {}", sessionId, emitters.toString());
    SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);
    emitters.put(sessionId, emitter);

    log.info("Emitter added for id: {}", sessionId);

    try {
      emitter.send(SseEmitter.event().name("connect").data("connected!"));
      log.info("Sent connect message to id: {}", sessionId);
    } catch (IOException e) {
      log.error("Failed to connect SSE for id: {}, error: {}", sessionId, e.getMessage());
    }

    emitter.onError(x -> {
      log.error("SSE Error for id : {}, message : {}", sessionId, x.getMessage());
      emitters.remove(sessionId);
    });

    emitter.onTimeout(() -> {
      log.warn("SSE Timeout for id: {}", sessionId);
//      emitter.complete();
      emitters.remove(sessionId);
    });

    emitter.onCompletion(() -> {
      log.info("SSE Completed for id: {}", sessionId);
      emitters.remove(sessionId);
      SseEmitter newEmitter = new SseEmitter(Long.MAX_VALUE);
      emitters.put(sessionId, newEmitter);
      log.info("New emitter created for id: {}", sessionId);
    });

    return emitter;
  }


  public void sendNotification(String sessionId, NotificationResponseDto responseDto){
    log.info("send SSE : sessionId = {}, notificationId= {}", sessionId, responseDto.getId());
    if (null == sessionId || sessionId.isBlank()){
      return;
    }
    SseEmitter emitter = emitters.getOrDefault(sessionId, null);
    try{
      if (null == emitter){
        log.error("SSE does not exist for sessionId : {}", sessionId);
      } else {
        emitter.send(SseEmitter.event().name("message").data(responseDto));
      }
    } catch (IOException e){
      log.error("Error occurred sending notification: {}. Removing emitter for: {}", e.getMessage(), sessionId);
      emitters.remove(sessionId);
    }
  }

  public void removeEmitter(String expired) {
    if (null != expired && !expired.isBlank()){
      emitters.remove(expired);
    }
  }
}
