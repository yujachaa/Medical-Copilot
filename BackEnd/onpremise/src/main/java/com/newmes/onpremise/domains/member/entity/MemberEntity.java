package com.newmes.onpremise.domains.member.entity;

import com.newmes.onpremise.domains.member.domain.RoleType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@Document(indexName = "members")
public class MemberEntity {

    @Id
    private String id;

    private String email;
    private String password;
    private RoleType role;
    private String name;
    private int usage;

    @Field(type = FieldType.Date)
    private LocalDateTime createdDate;

    @Field(type = FieldType.Date)
    private LocalDateTime modifiedDate;
}
