package com.newmes.onpremise.domains.chat.controller;

import com.newmes.onpremise.domains.chat.dto.response.ChatResponseDto;
import com.newmes.onpremise.domains.chat.service.ChatService;
import com.newmes.onpremise.domains.chat.dto.request.ChatRequestDto;
import com.newmes.onpremise.domains.report.dto.request.ReportRequestDto;
import com.newmes.onpremise.global.util.HttpResponseUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("chat")
@RequiredArgsConstructor
public class ChatController {

  private final ChatService chatService;
  private final HttpResponseUtil responseUtil;

  @PostMapping("/add")
  public void addChat(@RequestBody ChatRequestDto chatDto){
      chatService.add(chatDto);
  }

  @PatchMapping("/linkReport")
  public void linkReport(@RequestBody ReportRequestDto reportDto){
    chatService.link(reportDto);
  }

  @GetMapping("{pid}")
  public ResponseEntity<?> loadAll(@PathVariable("pid") String patientId){
    ChatResponseDto chats = chatService.load(patientId);
    return responseUtil.createResponse(chats);
  }

}
