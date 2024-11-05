package com.newmes.onpremise.domains.chat.controller;


import com.newmes.onpremise.domains.chat.entity.ChatDocument;
import com.newmes.onpremise.domains.chat.service.ChatService;
import com.newmes.onpremise.domains.chat.dto.request.ChatRequestDto;
import com.newmes.onpremise.domains.report.dto.request.ReportRequestDto;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


public class ChatController {

  private final ChatService chatService;

  public ChatController(ChatService chatService) {
    this.chatService = chatService;
  }

  @PostMapping("/add")
  public void addChat(@RequestBody ChatRequestDto chatDto){
      chatService.add(chatDto);
  }

  @PatchMapping("/linkReport")
  public void linkReport(@RequestBody ReportRequestDto reportDto){
    chatService.link(reportDto);
  }

  @GetMapping("{id}")
  public void loadAll(@PathVariable String patientId){
    List<ChatDocument> chats = chatService.load(patientId);
  }

}
