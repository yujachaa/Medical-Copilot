package com.newmes.onpremise.global.kafka.consumer;

import com.newmes.onpremise.domains.chat.dto.request.ChatRequestDto;
import com.newmes.onpremise.domains.chat.service.ChatService;
import com.newmes.onpremise.domains.drawing.domain.CoordinatesGroup;
import com.newmes.onpremise.domains.drawing.dto.DrawingRequestDto;
import com.newmes.onpremise.domains.drawing.service.DrawingService;
import com.newmes.onpremise.domains.history.entity.HistoryEntity;
import com.newmes.onpremise.domains.history.service.HistoryService;
import com.newmes.onpremise.domains.notification.dto.request.NotificationRequestDto;
import com.newmes.onpremise.domains.notification.service.NotificationService;
import com.newmes.onpremise.domains.quota.entity.QuotaEntity;
import com.newmes.onpremise.domains.quota.service.QuotaService;
import com.newmes.onpremise.domains.report.dto.request.ReportRequestDto;
import com.newmes.onpremise.domains.report.service.ReportService;
import com.newmes.onpremise.global.kafka.dto.AiResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import java.util.*;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;

@Slf4j
@RequiredArgsConstructor
@Component
public class KafkaConsumer {

    private final ChatService chatService;
    private final ReportService reportService;
    private final HistoryService historyService;
    private final QuotaService quotaService;
    private final NotificationService notificationService;
    private final DrawingService drawingService;

    @KafkaListener(topics = "ai", groupId = "ai-group", concurrency ="1")
    public void processAiTopic(ConsumerRecord<String, AiResponseDto> record) {
        log.info("ai로부터 온 메시지 : {}", record.toString());
        AiResponseDto aiResponse = record.value();

        ReportRequestDto reportRequestDto = ReportRequestDto.builder()
                .image(aiResponse.getImage())
                .sex(aiResponse.getSex())
                .PID(aiResponse.getPID())
                .age(aiResponse.getAge())
                .disease(aiResponse.getClassification() != null ? aiResponse.getClassification().getPredictedClass() : "Unknown Disease")
                .summary(aiResponse.getSummary() != null ? aiResponse.getSummary() : "No summary available")
                .location(aiResponse.getLocation() != null ? aiResponse.getLocation() : "Unknown Location")
                .size(aiResponse.getDetection() != null ?
                        String.format("%.1f cm × %.1f cm",
                                aiResponse.getDetection().getWidth() * (35.0 / 1024.0),
                                aiResponse.getDetection().getHeight() * (35.0 / 1024.0)
                        ) : "Unknown Size")
                .memberId(aiResponse.getMemberId())
                .shootingDate(aiResponse.getShootingDate())
                .symptoms("")
                .detection(aiResponse.getDetection())
                .build();

        String reportId = reportService.register(reportRequestDto);
        List<CoordinatesGroup> emptyList = new ArrayList<>();
        DrawingRequestDto drawingRequestDto = DrawingRequestDto.builder()
                .coordinatesGroups(emptyList)
                .build();

        drawingService.saveDrawing(reportId, drawingRequestDto);

        ChatRequestDto userQuestion = ChatRequestDto.builder()
                .agent(aiResponse.getAgent())
                .comment(aiResponse.getComment() != null ? aiResponse.getComment() : "No comment provided")
                .PID(aiResponse.getPID())
                .memberId(aiResponse.getMemberId())
                .isQuestion(true)
                .reportId(reportId)
                .build();

        ChatRequestDto aiAnswer = ChatRequestDto.builder()
                .agent(aiResponse.getAgent())
                .comment(aiResponse.getAnswer() != null ? aiResponse.getAnswer() : "No answer provided")
                .PID(aiResponse.getPID())
                .memberId(aiResponse.getMemberId())
                .isQuestion(false)
                .reportId(reportId)
                .build();

        chatService.add(userQuestion);
        chatService.add(aiAnswer);

        HistoryEntity historyEntity = HistoryEntity.builder()
                .recentDate(OffsetDateTime.now())
                .memberId(aiResponse.getMemberId())
                .age(aiResponse.getAge())
                .PID(aiResponse.getPID())
                .sex(aiResponse.getSex())
                .disease(aiResponse.getClassification() != null ? aiResponse.getClassification().getPredictedClass() : null)
                .build();
        historyService.register(historyEntity);

        QuotaEntity quota = QuotaEntity.builder()
                .modality(aiResponse.getAgent())
                .build();
        quotaService.createQuota(quota);

        NotificationRequestDto noti = NotificationRequestDto.builder()
                .isRead(false)
                .createdDate(LocalDateTime.now())
                .readDate(null)
                .PID(aiResponse.getPID())
                .memberId(aiResponse.getMemberId())
                .modality(aiResponse.getAgent())
                .reportId(reportId)
                .build();
        notificationService.createAndSend(noti);
    }


}
