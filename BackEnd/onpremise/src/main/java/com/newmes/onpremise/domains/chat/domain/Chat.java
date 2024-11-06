package com.newmes.onpremise.domains.chat.domain;

import com.newmes.onpremise.domains.chat.entity.ChatEntity;
import lombok.Builder;
import lombok.Data;

import java.time.OffsetDateTime;

@Data
@Builder
public class Chat {

    private String id;
    private String reportId;
    private String agent;
    private String comment;
    private boolean isQuestion;
    private OffsetDateTime createDate;
    private String PID;
    private String memberId;

    public static Chat from(ChatEntity entity) {
        return Chat.builder()
                .id(entity.getId())
                .reportId(entity.getReportId())
                .agent(entity.getAgent())
                .comment(entity.getComment())
                .isQuestion(entity.isQuestion())
                .createDate(entity.getCreateDate())
                .PID(entity.getPID())
                .memberId(entity.getMemberId())
                .build();
    }

}
