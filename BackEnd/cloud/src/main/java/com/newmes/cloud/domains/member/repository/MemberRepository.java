package com.newmes.cloud.domains.member.repository;

import com.newmes.cloud.domains.member.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<MemberEntity, Long> {
    Optional<MemberEntity> findByUsername (String name);
}
