package com.newmes.onpremise.domains.chat.controller;

import com.newmes.onpremise.domains.chat.dto.response.ChatResponseDto;
import com.newmes.onpremise.domains.chat.service.ChatService;
import com.newmes.onpremise.domains.chat.dto.request.ChatRequestDto;
import com.newmes.onpremise.domains.patient.dto.response.PatientResponseDto;
import com.newmes.onpremise.global.util.HttpResponseUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
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

  @GetMapping("{pid}")
  public ResponseEntity<?> loadAll(@PathVariable("pid") String patientId){
    ChatResponseDto chats = chatService.load(patientId);
    return responseUtil.createResponse(chats);
  }

  @GetMapping("/recent/{page}/{size}")
  public ResponseEntity<?> getRecentChats(
          @PathVariable("page") int page,
          @PathVariable("size") int size) {
    try {
      Page<ChatResponseDto> results = chatService.getRecentChats(page, size);
      return responseUtil.createResponse(results);
    } catch (Exception e) {
      e.printStackTrace();
      return responseUtil.errorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to retrieve recent patients");
    }
  }
}
