package com.newmes.onpremise.domains.notification.repository;

import com.newmes.onpremise.domains.notification.entity.NotificationEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationRepository extends JpaRepository<NotificationEntity, Integer> {

  List<NotificationEntity> findAllByMemberId(String id);

  List<NotificationEntity> findAllByMemberIdAndIsReadOrderByCreatedDateAsc(String id, boolean b);
}
