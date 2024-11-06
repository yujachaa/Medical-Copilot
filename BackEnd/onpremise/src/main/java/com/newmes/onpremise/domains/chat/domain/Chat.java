package com.newmes.onpremise.domains.chat.domain;

import java.time.LocalDate;

import com.newmes.onpremise.domains.chat.entity.ChatEntity;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Chat {

    private String id;
    private String reportId;
    private int order;
    private String comment;
    private boolean isQuestion;
    private LocalDate createDate;
    private String PID;
    private String type;
    private String memberId;

    public static Chat from(ChatEntity entity) {
        return Chat.builder()
                .id(entity.getId())
                .reportId(entity.getReportId())
                .order(entity.getOrder())
                .comment(entity.getComment())
                .isQuestion(entity.isQuestion())
                .createDate(entity.getCreateDate())
                .PID(entity.getPID())
                .type(entity.getType())
                .memberId(entity.getMemberId())
                .build();
    }

}
