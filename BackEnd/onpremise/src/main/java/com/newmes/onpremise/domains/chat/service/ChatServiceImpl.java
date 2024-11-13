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
  public Page<ChatResponseDto> getRecentChats(int page, int size) {
    PageRequest pageRequest = PageRequest.of(page, size, Sort.by("createDate").descending());
    return null;
//    List<ChatResponseDto> recentPatients = chatRepository.findAll(pageRequest)
//            .stream()
//            .collect(Collectors.groupingBy(
//                    chat -> chat.getPID() + "_" + chat.getCreateDate(),
//                    Collectors.toList()
//            ))
//            .entrySet().stream()
//            .map(entry -> {
//              String[] keys = entry.getKey().split("_");
//              String pid = keys[0];
//              LocalDate visitDate = LocalDate.parse(keys[1]);
//
//              List<ChatEntity> chats = entry.getValue();
//
//              String parsedModality = parseModality(
//                      chats.stream().map(PatientEntity::getModality).collect(Collectors.toList())
//              );
//
//              return PatientResponseDto.builder()
//                      .PID(pid)
//                      .sex(sex)
//                      .age(age)
//                      .modality(parsedModality)
//                      .visitDate(visitDate)
//                      .build();
//            })
//            .sorted((p1, p2) -> p2.getVisitDate().compareTo(p1.getVisitDate()))
//            .collect(Collectors.toList());
//
//    return new PageImpl<>(recentPatients, pageRequest, recentPatients.size());
  }
}
