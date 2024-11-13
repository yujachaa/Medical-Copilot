package com.newmes.onpremise.domains.member.entity;

import com.newmes.onpremise.domains.member.domain.Member;
import com.newmes.onpremise.domains.member.domain.RoleType;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import java.time.LocalDate;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(indexName = "members")
public class MemberEntity {

    @Id
    private String id;

    @Field(type = FieldType.Keyword)
    private String email;

    @Field(type = FieldType.Keyword)
    private String password;

    @Field(type = FieldType.Keyword)
    private String name;

    @Field(type = FieldType.Keyword)
    private String serialKey;

    @Field(type = FieldType.Keyword)
    private RoleType role;

    @Field(type = FieldType.Date)
    private LocalDate createDate;

    @Field(type = FieldType.Date)
    private LocalDate modifiedDate;

    public MemberEntity update(String name, String password) {
        return MemberEntity.builder()
                .id(this.id)
                .email(this.email)
                .password(password)
                .name(name)
                .serialKey(this.serialKey)
                .role(this.role)
                .createDate(this.createDate)
                .modifiedDate(LocalDate.now())
                .build();
    }
    public Member toDomain() {
        return Member.builder()
                .email(this.email)
                .name(this.name)
                .serialKey(this.serialKey)
                .role(this.role)
                .createDate(this.createDate)
                .modifiedDate(this.modifiedDate)
                .build();
    }
    public void updateName(String name) {
        this.name = name;
    }

    public void updateEmail(String email) {
        this.email = email;
    }

    public void updatePassword(String password) {
        this.password = password;
    }

}
