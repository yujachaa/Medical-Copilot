package com.newmes.onpremise.domains.chat.service;

import com.newmes.onpremise.domains.chat.dto.request.ChatRequestDto;
import com.newmes.onpremise.domains.chat.dto.response.ChatResponseDto;
import com.newmes.onpremise.domains.patient.dto.response.PatientResponseDto;
import org.springframework.data.domain.Page;

public interface ChatService {

  void add(ChatRequestDto chatDto);

  ChatResponseDto load(String patientId);

  Page<ChatResponseDto> getRecentChats(String pid, int page, int size);

}
