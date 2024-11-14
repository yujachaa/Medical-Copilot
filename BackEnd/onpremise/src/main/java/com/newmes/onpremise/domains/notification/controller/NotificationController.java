package com.newmes.onpremise.domains.notification.controller;


import com.newmes.onpremise.domains.notification.dto.response.NotificationResponseDto;
import com.newmes.onpremise.domains.notification.service.NotificationService;
import com.newmes.onpremise.global.redis.dto.RedisDto;
import com.newmes.onpremise.global.redis.service.RedisService;
import com.newmes.onpremise.global.security.jwt.JwtUtil;
import com.newmes.onpremise.global.util.MemberInfo;
import com.newmes.onpremise.global.util.SessionHolders;
import com.newmes.onpremise.global.util.SseEmitters;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import java.time.Duration;
import java.util.List;
import java.util.UUID;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Slf4j
@RestController
@RequestMapping("/notification")
@RequiredArgsConstructor
public class NotificationController {

  private final NotificationService notificationService;


  @GetMapping(value = "/emitter/{memberId}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
  public ResponseEntity<SseEmitter> addEmitter(@PathVariable("memberId") String memberId, HttpSession session) {
    log.info("emitter join---, id: {}",MemberInfo.getMemberId());
    try {
      //  String  id = MemberInfo.getMemberId();
//      // 1. SecurityContext에서 사용자 ID 가져오기
//      if (id == null || "anonymousUser".equals(id)) {
//
//        log.info("security token id: " + id);
//        id =memberId;
//      }
      String sessionId = session.getId();
      SseEmitter emitter = notificationService.addEmitter(memberId, sessionId);
      return ResponseEntity.ok(emitter);
    } catch (Exception e) {
      log.error("Error in addEmitter: ", e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }


//  @GetMapping("/otp")
//  public ResponseEntity<OtpResponseDto> getOTP(HttpSession session) {
//    String id = MemberInfo.getMemberId();
//    String otp = UUID.randomUUID().toString();
//    session.setAttribute("otp", otp);
//    session.setAttribute("id", id);
//    OtpResponseDto otpDto = new OtpResponseDto(otp);
//    return ResponseEntity.status(HttpStatus.OK).body(otpDto);
//  }

  @PatchMapping("/{notificationId}")
  public ResponseEntity<?> readNotification(@PathVariable int notificationId){
    try {
      String res = notificationService.readNotification(notificationId);
      if (null == res){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Notification does not exist");
      }
    } catch (Exception e){
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Fail");
    }
    return ResponseEntity.status(HttpStatus.OK).body("Success");
  }

  @PatchMapping("/readAll")
  public ResponseEntity<?> readAll(){
    String memberId = MemberInfo.getMemberId();
    try {
      notificationService.readAll(memberId);
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
