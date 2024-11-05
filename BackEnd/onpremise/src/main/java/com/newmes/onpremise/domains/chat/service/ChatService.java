package com.newmes.onpremise.domains.chat.service;

import com.newmes.onpremise.domains.chat.dto.request.ChatRequestDto;
import com.newmes.onpremise.domains.chat.entity.ChatDocument;
import com.newmes.onpremise.domains.report.dto.request.ReportRequestDto;
import java.util.List;

public interface ChatService {

  void add(ChatRequestDto chatDto);

  void link(ReportRequestDto reportDto);

  List<ChatDocument> load(String patientId);
}
