package com.newmes.onpremise.domains.chat.service;

import com.newmes.onpremise.domains.chat.domain.Chat;
import com.newmes.onpremise.domains.chat.dto.request.ChatRequestDto;
import com.newmes.onpremise.domains.chat.dto.response.ChatResponseDto;
import com.newmes.onpremise.domains.chat.entity.ChatEntity;
import com.newmes.onpremise.domains.chat.repository.ChatRepository;
import com.newmes.onpremise.domains.report.dto.request.ReportRequestDto;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ChatServiceImpl implements ChatService{

  private final ChatRepository chatRepository;

  public ChatServiceImpl(ChatRepository chatRepository) {
    this.chatRepository = chatRepository;
  }

  @Override
  public void add(ChatRequestDto chatDto) {
   // dChatDocument document = ChatDocument.from(chatDto);
    //chatRepository.save(document);
  }

  @Override
  public void link(ReportRequestDto reportDto) {
      //ChatDocument doc = chatRepository.findById(reportDto.getChatId()).orElse(null);
      //doc.setReportId(reportDto.getId());
      //chatRepository.save(doc);
  }

  @Override
  public ChatResponseDto load(String patientId) {
    List<ChatEntity> list =  chatRepository.findByPID(patientId);
    List<Chat> chatList = list.stream()
            .map(Chat::from)
            .collect(Collectors.toList());
    ChatResponseDto responseDto = ChatResponseDto.builder().PID(patientId).chatList(chatList).build();
    return responseDto;
  }
}
