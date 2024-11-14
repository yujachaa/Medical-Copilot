package com.newmes.onpremise.domains.notification.service;

import com.newmes.onpremise.domains.notification.dto.request.NotificationRequestDto;
import com.newmes.onpremise.domains.notification.dto.response.NotificationResponseDto;
import java.util.List;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface NotificationService {

  void createAndSend(NotificationRequestDto requestDto);

  String readNotification(int id);

  NotificationResponseDto getNotification(int id);

  List<NotificationResponseDto> listAllNotifications(String id);

  SseEmitter addEmitter(String memberId, String sessionId);

  void readAll(String memberId);

}
