package com.newmes.onpremise.domains.history.service;

import com.newmes.onpremise.domains.history.dto.History;
import com.newmes.onpremise.domains.history.entity.HistoryEntity;
import com.newmes.onpremise.domains.history.repository.HistoryRepository;
import com.newmes.onpremise.global.util.MemberInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HistoryServiceImpl implements HistoryService {

    private final HistoryRepository historyRepository;

    @Override
    public String register(HistoryEntity historyEntity) {
        return historyRepository.save(historyEntity).getId();
    }

    @Override
    public List<History> getHistoryByMemberId() {
        String memberId = MemberInfo.getMemberId();
        List<HistoryEntity> historyEntities = historyRepository.findAllByMemberId(memberId);

        Map<String, History> recentHistoryMap = new LinkedHashMap<>();

        historyEntities.stream()
                .sorted(Comparator.comparing(HistoryEntity::getRecentDate).reversed())
                .forEach(entity -> {
                    String pid = entity.getPID();

                    if (recentHistoryMap.containsKey(pid)) {
                        History currentHistory = recentHistoryMap.get(pid);

                        String agentSummary = currentHistory.summary().split(" : ")[0];
                        if (agentSummary.split(", ").length < 2 && !agentSummary.contains(entity.getAgent())) {
                            agentSummary = updateAgentSummary(agentSummary, entity.getAgent());
                        }

                        String diseaseSummary = currentHistory.summary().split(" : ")[1];
                        if (diseaseSummary.equals("none") && entity.getDisease() != null) {
                            diseaseSummary = entity.getDisease();
                        }

                        currentHistory = new History(
                                currentHistory.PID(),
                                currentHistory.sex(),
                                currentHistory.age(),
                                agentSummary + " : " + diseaseSummary,
                                currentHistory.memberId(),
                                currentHistory.recentDate()
                        );

                        recentHistoryMap.put(pid, currentHistory);
                    } else {
                        String summary = (entity.getAgent() != null ? entity.getAgent() : "none") + " : " +
                                (entity.getDisease() != null ? entity.getDisease() : "none");
                        History history = new History(
                                entity.getPID(),
                                entity.getSex(),
                                entity.getAge(),
                                summary,
                                entity.getMemberId(),
                                entity.getRecentDate()
                        );
                        recentHistoryMap.put(pid, history);
                    }
                });

        return new ArrayList<>(recentHistoryMap.values());
    }

    private String updateAgentSummary(String existingAgents, String newAgent) {
        if (existingAgents.equals("none")) {
            return newAgent;
        } else {
            return existingAgents + ", " + newAgent;
        }
    }
}
