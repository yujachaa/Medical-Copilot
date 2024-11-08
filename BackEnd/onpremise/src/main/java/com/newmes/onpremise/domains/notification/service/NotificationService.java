package com.newmes.onpremise.domains.notification.service;


import com.newmes.onpremise.domains.notification.dto.request.NotificationRequestDto;
import com.newmes.onpremise.domains.notification.dto.response.NotificationResponseDto;
import java.util.List;

public interface NotificationService {

  void createAndSend(NotificationRequestDto requestDto);

  void readNotification(int id);

  NotificationResponseDto getNotification(int id);

  List<NotificationResponseDto> listAllNotifications(String id);
}
