package com.newmes.onpremise.domains.notification.service;


import com.newmes.onpremise.domains.notification.dto.request.NotificationRequestDto;
import com.newmes.onpremise.domains.notification.dto.response.NotificationResponseDto;
import com.newmes.onpremise.domains.notification.entity.NotificationEntity;
import com.newmes.onpremise.domains.notification.repository.NotificationRepository;
import com.newmes.onpremise.global.util.SessionHolders;
import com.newmes.onpremise.global.util.SseEmitters;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Slf4j
@Service
public class NofiticationServiceImpl implements NotificationService{

  private final NotificationRepository notificationRepository;
  private final SseEmitters sseEmitters;
  private final SessionHolders sessionHolders;

  public NofiticationServiceImpl(NotificationRepository notificationRepository,
      SseEmitters sseEmitters, SessionHolders sessionHolders) {
    this.notificationRepository = notificationRepository;
    this.sseEmitters = sseEmitters;
    this.sessionHolders = sessionHolders;
  }

  @Override
  public SseEmitter addEmitter(String memberId, String sessionId) {
    String expired = sessionHolders.addSession(memberId, sessionId);
    sseEmitters.removeEmitter(expired);
    return sseEmitters.addEmitter(sessionId);
  }

  @Override
  public void readAll(String memberId) {
    List<NotificationEntity> unreads = notificationRepository.findAllByMemberId(memberId);
    if (null != unreads && !unreads.isEmpty()) {
      unreads.forEach(n -> n.updateRead());
      notificationRepository.saveAll(unreads);
    }
  }

  @Override
  public void createAndSend(NotificationRequestDto requestDto) {
    log.info("create and send");
    NotificationEntity notificationEntity = NotificationEntity.from(requestDto);
    notificationRepository.save(notificationEntity);
    NotificationResponseDto responseDto = NotificationResponseDto.of(notificationEntity);
    log.info("before sending");
    String memberId = responseDto.getMemberId();
    String[] sessions = sessionHolders.getSessions(memberId);
    for (String sessionId : sessions){
      sseEmitters.sendNotification(sessionId, responseDto);
    }
  }

  @Override
  public String readNotification(int id) {
    Optional<NotificationEntity> optionalEntity = notificationRepository.findById(id);
    if (optionalEntity.isPresent()){
//      log.info("notification present: " + optionalEntity.get());
      NotificationEntity entity = optionalEntity.get();
      entity.updateRead();
      notificationRepository.save(entity);
      return "SUCCESS";
    }
    return null;
  }

  @Override
  public NotificationResponseDto getNotification(int id) {
    Optional<NotificationEntity> optionalEntity = notificationRepository.findById(id);
    if (optionalEntity.isPresent()){
        return NotificationResponseDto.of(optionalEntity.get());
    }
    return null;
  }

  @Override
  public List<NotificationResponseDto> listAllNotifications(String id){
    List<NotificationEntity> entities = notificationRepository.findAllByMemberIdAndReadOrderByCreatedDateAsc(id, false);
    List<NotificationResponseDto> res = new ArrayList<>();
    entities.forEach(x -> res.add(NotificationResponseDto.of(x)));
    return res;
  }

}
