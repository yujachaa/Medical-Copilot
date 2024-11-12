package com.newmes.onpremise.domains.notification.service;


import com.newmes.onpremise.domains.notification.dto.request.NotificationRequestDto;
import com.newmes.onpremise.domains.notification.dto.response.NotificationResponseDto;
import com.newmes.onpremise.domains.notification.entity.NotificationEntity;
import com.newmes.onpremise.domains.notification.repository.NotificationRepository;
import com.newmes.onpremise.global.util.SseEmitters;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class NofiticationServiceImpl implements NotificationService{

  private final NotificationRepository notificationRepository;
  private final SseEmitters sseEmitters;

  public NofiticationServiceImpl(NotificationRepository notificationRepository,
      SseEmitters sseEmitters) {
    this.notificationRepository = notificationRepository;
    this.sseEmitters = sseEmitters;
  }

  @Override
  public void createAndSend(NotificationRequestDto requestDto) {
    log.info("create and send");
    NotificationEntity notificationEntity = NotificationEntity.from(requestDto);
    notificationRepository.save(notificationEntity);
    NotificationResponseDto responseDto = NotificationResponseDto.of(notificationEntity);
    log.info("before sending");
    sseEmitters.sendNotification(responseDto);
  }

  @Override
  public void readNotification(int id) {
    Optional<NotificationEntity> optionalEntity = notificationRepository.findById(id);
    if (optionalEntity.isPresent()){
      optionalEntity.get().updateRead();
    }
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
