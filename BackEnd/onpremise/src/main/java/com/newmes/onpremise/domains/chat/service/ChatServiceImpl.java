package com.newmes.onpremise.domains.chat.service;

import com.newmes.onpremise.domains.chat.domain.Chat;
import com.newmes.onpremise.domains.chat.dto.request.ChatRequestDto;
import com.newmes.onpremise.domains.chat.dto.response.ChatResponseDto;
import com.newmes.onpremise.domains.chat.entity.ChatEntity;
import com.newmes.onpremise.domains.chat.repository.ChatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;
@RequiredArgsConstructor
@Service
public class ChatServiceImpl implements ChatService{

  private final ChatRepository chatRepository;

  @Override
  public void add(ChatRequestDto chatDto) {
    ChatEntity entity = ChatEntity.from(chatDto);
    chatRepository.save(entity);
  }


  @Override
  public ChatResponseDto load(String patientId) {
    List<ChatEntity> list =  chatRepository.findByPID(patientId);
    List<Chat> chatList = list.stream()
            .map(Chat::from)
            .collect(Collectors.toList());
      return ChatResponseDto.builder().PID(patientId).chatList(chatList).build();
  }
}
