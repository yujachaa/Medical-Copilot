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

  public SseEmitter addEmitter(String id) {
    log.error("Adding emitter :id ={}, emitters : {}", id, emitters.toString());
    SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);
    emitters.put(id, emitter);

    log.info("Emitter added for id: {}", id);

    try {
      emitter.send(SseEmitter.event().name("connect").data("connected!"));
      log.info("Sent connect message to id: {}", id);
    } catch (IOException e) {
      log.error("Failed to connect SSE for id: {}, error: {}", id, e.getMessage());
    }

    emitter.onError(x -> {
      log.error("SSE Error for id : {}, message : {}", id, x.getMessage());
    });

    emitter.onTimeout(() -> {
      log.warn("SSE Timeout for id: {}", id);
      emitter.complete();
    });

    emitter.onCompletion(() -> {
      log.info("SSE Completed for id: {}", id);
      emitters.remove(id);
      SseEmitter newEmitter = new SseEmitter(Long.MAX_VALUE);
      emitters.put(id, newEmitter);
      log.info("New emitter created for id: {}", id);
    });

    return emitter;
  }


  public void sendNotification(NotificationResponseDto responseDto){
    log.info("send notification");
    String id = responseDto.getMemberId();
    log.info("send SSE : member id= {}, id= {}",responseDto.getMemberId(), responseDto.getId());
    try{
      SseEmitter emitter = emitters.getOrDefault(id, null);
      if (null == emitter){
        log.error("SSE does not exist for id : {}", id);
      } else {
        emitter.send(SseEmitter.event().name("message").data(responseDto));
        log.info("send event");
      }
    } catch (IOException e){
      log.error("Error occurred sending notification: {}", e.getMessage());
    }
  }

}
