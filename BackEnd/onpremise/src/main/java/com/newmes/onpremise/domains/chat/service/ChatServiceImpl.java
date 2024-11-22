package com.newmes.onpremise.domains.chat.service;

import com.newmes.onpremise.domains.chat.domain.Chat;
import com.newmes.onpremise.domains.chat.dto.request.ChatRequestDto;
import com.newmes.onpremise.domains.chat.dto.response.ChatResponseDto;
import com.newmes.onpremise.domains.chat.entity.ChatEntity;
import com.newmes.onpremise.domains.chat.repository.ChatRepository;
import com.newmes.onpremise.domains.patient.dto.response.PatientResponseDto;
import com.newmes.onpremise.domains.patient.entity.PatientEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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

  @Override
  public Page<ChatResponseDto> getRecentChats(String pid, int page, int size) {
    PageRequest pageRequest = PageRequest.of(page, size, Sort.by("createDate").descending());

    Page<ChatEntity> chatEntityPage = chatRepository.findByPID(pid, pageRequest);

    List<Chat> chatList = chatEntityPage.stream()
            .map(Chat::from)
            .collect(Collectors.toList());

    ChatResponseDto responseDto = ChatResponseDto.builder()
            .PID(pid)
            .chatList(chatList)
            .build();

    return new PageImpl<>(List.of(responseDto), pageRequest, chatEntityPage.getTotalElements());
  }



}
