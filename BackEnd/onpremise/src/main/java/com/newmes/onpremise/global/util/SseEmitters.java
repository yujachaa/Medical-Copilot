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

  public SseEmitter addEmitter(String id){
    log.error("Adding emitter :id ={}, emitters : {}" ,id, emitters.toString());
    SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);
    emitters.put(id, emitter);
    try{
      emitter.send(SseEmitter.event()
          .name("connect")
          .data("connected!"));
    } catch(IOException e){
      log.error("Failed to connect SSE");
    }

    emitter.onError(x -> {
      log.error("SSE Error for id : {}, message : {}", id, x.getMessage());
    });

    emitter.onTimeout(() -> {
      emitter.complete();
    });

    emitter.onCompletion(() -> {
      emitters.remove(id);
      SseEmitter newEmitter = new SseEmitter(Long.MAX_VALUE);
      emitters.put(id, newEmitter);
    });

    return emitter;
  }

  public void sendNotification(NotificationResponseDto responseDto){
    String id = responseDto.getMemberId();
    log.info("send SSE : member id= {}, id= {}",responseDto.getMemberId(), responseDto.getId());
    try{
      SseEmitter emitter = emitters.getOrDefault(id, null);
      if (null == emitter){
        log.error("SSE does not exist for id : {}", id);
      } else {
        emitter.send(SseEmitter.event().name("notification").data(responseDto));
      }
    } catch (IOException e){
      log.error("Error occurred sending notification: {}", e.getMessage());
    }
  }

}
