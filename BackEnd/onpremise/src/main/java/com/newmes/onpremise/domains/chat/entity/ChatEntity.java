package com.newmes.onpremise.domains.chat.entity;

import java.time.LocalDate;

import com.newmes.onpremise.domains.chat.domain.Chat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
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

    @Field(type = FieldType.Integer)
    private int order;

    @Field(type = FieldType.Text)
    private String comment;

    @Field(type = FieldType.Boolean)
    private boolean isQuestion;

    @Field(type = FieldType.Date)
    private LocalDate createDate;

    @Field(name = "PID", type = FieldType.Keyword)
    private String PID;

    @Field(type = FieldType.Keyword)
    private String type;

    @Field(type = FieldType.Keyword)
    private String memberId;

    public static ChatEntity fromDomain(Chat domain) {
        return ChatEntity.builder()
                .id(domain.getId())
                .reportId(domain.getReportId())
                .order(domain.getOrder())
                .comment(domain.getComment())
                .isQuestion(domain.isQuestion())
                .createDate(domain.getCreateDate())
                .PID(domain.getPID())
                .memberId(domain.getMemberId())
                .build();
    }
}
