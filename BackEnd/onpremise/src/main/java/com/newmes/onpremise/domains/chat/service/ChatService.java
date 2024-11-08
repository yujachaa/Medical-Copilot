package com.newmes.onpremise.domains.chat.service;

import com.newmes.onpremise.domains.chat.dto.request.ChatRequestDto;
import com.newmes.onpremise.domains.chat.dto.response.ChatResponseDto;

public interface ChatService {

  void add(ChatRequestDto chatDto);

  ChatResponseDto load(String patientId);

}
