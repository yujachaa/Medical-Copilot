package com.newmes.cloud.domains.member.entity;

import com.newmes.cloud.domains.member.domain.RoleType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "members")
public class MemberEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RoleType role;

    public MemberEntity(String name, String password) {
        this.username = name;
        this.password = password;
        role = RoleType.ADMIN;
    }
}
