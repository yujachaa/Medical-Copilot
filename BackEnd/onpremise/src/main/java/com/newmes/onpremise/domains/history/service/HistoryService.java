package com.newmes.onpremise.domains.history.service;

import com.newmes.onpremise.domains.history.dto.History;
import com.newmes.onpremise.domains.history.entity.HistoryEntity;

import java.util.List;

public interface HistoryService {
    String register(HistoryEntity historyEntity);
    List<History> getHistoryByMemberId();
}
