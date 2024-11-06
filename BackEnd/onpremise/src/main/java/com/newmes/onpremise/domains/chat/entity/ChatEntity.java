package com.newmes.onpremise.domains.chat.entity;

import java.time.OffsetDateTime;
import com.newmes.onpremise.domains.chat.dto.request.ChatRequestDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.DateFormat;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@AllArgsConstructor
@Data
@Document(indexName = "chats")
@Builder
public class ChatEntity {

    @Id
    private String id;

    @Field(type = FieldType.Keyword)
    private String reportId;

    @Field(type = FieldType.Text)
    private String comment;

    @Field(type = FieldType.Boolean)
    private boolean isQuestion;

    @Field(type = FieldType.Date, format = DateFormat.date_time)
    private OffsetDateTime createDate;

    @Field(name = "PID", type = FieldType.Keyword)
    private String PID;

    @Field(type = FieldType.Keyword)
    private String agent;

    @Field(type = FieldType.Keyword)
    private String memberId;

    public static ChatEntity from(ChatRequestDto dto) {
        return ChatEntity.builder()
                .PID(dto.PID())
                .isQuestion(dto.isQuestion())
                .comment(dto.comment())
                .agent(dto.agent())
                .memberId(dto.memberId())
                .createDate(OffsetDateTime.now())
                .reportId(dto.reportId())
                .build();
    }
}
