package com.newmes.onpremise.domains.notification.controller;

import com.newmes.onpremise.domains.notification.dto.OtpResponseDto;
import com.newmes.onpremise.domains.notification.dto.response.NotificationResponseDto;
import com.newmes.onpremise.domains.notification.service.NotificationService;
import com.newmes.onpremise.global.redis.dto.RedisDto;
import com.newmes.onpremise.global.redis.service.RedisService;
import com.newmes.onpremise.global.util.MemberInfo;
import com.newmes.onpremise.global.util.SseEmitters;
import jakarta.servlet.http.HttpSession;
import java.time.Duration;
import java.util.List;
import java.util.UUID;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/notification")
public class NotificationController {

  private final NotificationService notificationService;
  private final SseEmitters sseEmitters;
  private final RedisService redisService;

  public NotificationController(NotificationService notificationService, SseEmitters sseEmitters,
      RedisService redisService) {
    this.notificationService = notificationService;
    this.sseEmitters = sseEmitters;
    this.redisService = redisService;
  }

  @GetMapping(value = "/emitter/{otp}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
  public ResponseEntity<?> addEmitter(@PathVariable String otp, HttpSession session){
    String storedOtp = (String) session.getAttribute("otp");
    log.info("SSE Request by Session: {}, StoredOtp: {}, otp: {}", session.getId(), storedOtp, otp);
    if (otp.equals(storedOtp)){
      String id = (String) session.getAttribute("id");
      sseEmitters.addEmitter(id);
      return ResponseEntity.status(HttpStatus.OK).body(null);
    }
    return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
  }

  @GetMapping("/otp")
  public ResponseEntity<OtpResponseDto> getOTP(HttpSession session) {
    String id = MemberInfo.getMemberId();
    String otp = UUID.randomUUID().toString();
    session.setAttribute("otp", otp);
    session.setAttribute("id", id);
    log.info("OTP Stored -> Session: {}, otp: {}", session.getId(), otp);
    OtpResponseDto otpDto = new OtpResponseDto(otp);
    return ResponseEntity.status(HttpStatus.OK).body(otpDto);
  }

  @PatchMapping("/{notificationId}")
  public ResponseEntity<?> readNotification(@PathVariable int notificationId){
    try {
      notificationService.readNotification(notificationId);
    } catch (Exception e){
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Fail");
    }
    return ResponseEntity.status(HttpStatus.OK).body("Success");
  }

  @GetMapping("/all")
  public ResponseEntity<List<NotificationResponseDto>> allNotifications() {
    String id = MemberInfo.getMemberId();
    return ResponseEntity.status(HttpStatus.OK).body(notificationService.listAllNotifications(id));
  }
}
