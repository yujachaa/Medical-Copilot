package com.newmes.onpremise.domains.notification.controller;

import com.newmes.onpremise.domains.member.domain.Member;
import com.newmes.onpremise.domains.member.domain.Token;
import com.newmes.onpremise.domains.notification.dto.OtpResponseDto;
import com.newmes.onpremise.domains.notification.dto.response.NotificationResponseDto;
import com.newmes.onpremise.domains.notification.service.NotificationService;
import com.newmes.onpremise.global.redis.dto.RedisDto;
import com.newmes.onpremise.global.redis.service.RedisService;
import com.newmes.onpremise.global.security.jwt.JwtUtil;
import com.newmes.onpremise.global.util.MemberInfo;
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
  private final SseEmitters sseEmitters;
  private final RedisService redisService;
  private final JwtUtil jwtUtil;


  @GetMapping(value = "/emitter/{memberId}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
  public ResponseEntity<SseEmitter> addEmitter(@PathVariable("memberId") String memberId) {
    log.info("emitter join---, id: {}",MemberInfo.getMemberId());
  String  id = MemberInfo.getMemberId();
    try {
      // 1. SecurityContext에서 사용자 ID 가져오기
      if (id == null || "anonymousUser".equals(id)) {

        log.info("security token id: " + id);
        id =memberId;
      }
      // 4. SSE Emitter 생성 및 반환

      SseEmitter emitter = sseEmitters.addEmitter(id);
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
