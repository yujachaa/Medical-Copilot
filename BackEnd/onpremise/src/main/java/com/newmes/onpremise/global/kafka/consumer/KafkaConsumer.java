package com.newmes.onpremise.global.kafka.consumer;

import com.newmes.onpremise.domains.chat.dto.request.ChatRequestDto;
import com.newmes.onpremise.domains.chat.service.ChatService;
import com.newmes.onpremise.domains.history.entity.HistoryEntity;
import com.newmes.onpremise.domains.history.service.HistoryService;
import com.newmes.onpremise.domains.report.dto.request.ReportRequestDto;
import com.newmes.onpremise.domains.report.service.ReportService;
import com.newmes.onpremise.global.kafka.dto.AiResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import java.time.OffsetDateTime;

@Slf4j
@RequiredArgsConstructor
@Component
public class KafkaConsumer {

    private final ChatService chatService;
    private final ReportService reportService;
    private final HistoryService historyService;

    @KafkaListener(topics = "ai", groupId = "ai-group")
    public void processAiTopic(ConsumerRecord<String, AiResponseDto> record) {
        AiResponseDto aiResponse = record.value();

        ReportRequestDto reportRequestDto = ReportRequestDto.builder()
                .image(aiResponse.image())
                .sex(aiResponse.sex())
                .PID(aiResponse.PID())
                .age(aiResponse.age())
                .disease(aiResponse.classification() != null ? aiResponse.classification().predictedClass() : "Unknown Disease")
                .summary(aiResponse.summary() != null ? aiResponse.summary() : "No summary available")
                .location("Unknown Location")
                .size(aiResponse.detection() != null ? aiResponse.detection().getWidth() + " x " + aiResponse.detection().getHeight() : "Unknown Size")
                .memberId(aiResponse.memberId())
                .shootingDate(aiResponse.shootingDate())
                .symptoms("No symptoms")
                .detection(aiResponse.detection())
                .build();

        String reportId = reportService.register(reportRequestDto);

        ChatRequestDto userQuestion = ChatRequestDto.builder()
                .agent(aiResponse.agent())
                .comment(aiResponse.comment() != null ? aiResponse.comment() : "No comment provided")
                .PID(aiResponse.PID())
                .memberId(aiResponse.memberId())
                .isQuestion(true)
                .reportId(reportId)
                .build();

        ChatRequestDto aiAnswer = ChatRequestDto.builder()
                .agent(aiResponse.agent())
                .comment(aiResponse.answer() != null ? aiResponse.answer() : "No answer provided")
                .PID(aiResponse.PID())
                .memberId(aiResponse.memberId())
                .isQuestion(false)
                .reportId(reportId)
                .build();


        chatService.add(userQuestion);
        chatService.add(aiAnswer);

        HistoryEntity historyEntity = HistoryEntity.builder()
                .recentDate(OffsetDateTime.now())
                .memberId(aiResponse.memberId())
                .age(aiResponse.age())
                .PID(aiResponse.PID())
                .sex(aiResponse.sex())
                .disease(aiResponse.classification() != null ? aiResponse.classification().predictedClass() : null)
                .build();
        historyService.register(historyEntity);
    }

}
