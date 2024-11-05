package com.newmes.onpremise.domains.chat.service;

import com.newmes.onpremise.domains.chat.dto.request.ChatRequestDto;
import com.newmes.onpremise.domains.chat.entity.ChatDocument;
import com.newmes.onpremise.domains.chat.repository.ChatRepository;
import com.newmes.onpremise.domains.report.dto.request.ReportRequestDto;
import java.util.List;

public class ChatServiceImpl implements ChatService{

  private final ChatRepository chatRepository;

  public ChatServiceImpl(ChatRepository chatRepository) {
    this.chatRepository = chatRepository;
  }

  @Override
  public void add(ChatRequestDto chatDto) {
    ChatDocument document = ChatDocument.from(chatDto);
    chatRepository.save(document);
  }

  @Override
  public void link(ReportRequestDto reportDto) {
      ChatDocument doc = chatRepository.findById(reportDto.getChatId()).orElse(null);
      doc.setReportId(reportDto.getId());
      chatRepository.save(doc);
  }

  @Override
  public List<ChatDocument> load(String patientId) {
    return chatRepository.findAllByPatientIdOrderByRegdateDesc(patientId);
  }
}
