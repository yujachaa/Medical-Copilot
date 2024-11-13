package com.newmes.onpremise.domains.history.service;

import com.newmes.onpremise.domains.history.dto.History;
import com.newmes.onpremise.domains.history.entity.HistoryEntity;
import com.newmes.onpremise.domains.history.repository.HistoryRepository;
import com.newmes.onpremise.domains.patient.domain.Gender;
import com.newmes.onpremise.global.util.MemberInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class HistoryServiceImpl implements HistoryService {

    private final HistoryRepository historyRepository;

    @Override
    public String register(HistoryEntity historyEntity) {
        if (historyEntity == null) {
            throw new IllegalArgumentException("HistoryEntity cannot be null.");
        }
        return historyRepository.save(historyEntity).getId();
    }

    @Override
    public List<History> getHistoryByMemberId() {
        String memberId = MemberInfo.getMemberId();
        if (memberId == null || memberId.isEmpty()) {
            return Collections.emptyList();
        }

        List<HistoryEntity> historyEntities = Optional.ofNullable(historyRepository.findAllByMemberId(memberId))
                .orElse(Collections.emptyList());

        Map<String, History> recentHistoryMap = new LinkedHashMap<>();

        historyEntities.stream()
                .filter(Objects::nonNull)
                .sorted(Comparator.comparing(
                        HistoryEntity::getRecentDate,
                        Comparator.nullsLast(OffsetDateTime::compareTo)
                ).reversed())
                .forEach(entity -> {
                    String pid = Optional.ofNullable(entity.getPID()).orElse("");
                    if (pid.isEmpty()) return;

                    if (recentHistoryMap.containsKey(pid)) {
                        History currentHistory = recentHistoryMap.get(pid);

                        if (currentHistory == null || currentHistory.summary() == null) {
                            return;
                        }

                        String[] summaryParts = currentHistory.summary().split(" : ");
                        String agentSummary = summaryParts.length > 0 ? summaryParts[0] : "none";
                        String diseaseSummary = summaryParts.length > 1 ? summaryParts[1] : "none";

                        if (agentSummary.split(", ").length < 2 && !agentSummary.contains(entity.getAgent())) {
                            agentSummary = updateAgentSummary(agentSummary, entity.getAgent());
                        }

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

                        String agent = Optional.ofNullable(entity.getAgent()).orElse("none");
                        String disease = Optional.ofNullable(entity.getDisease()).orElse("none");
                        String summary = agent + " : " + disease;

                        History history = new History(
                                Optional.ofNullable(entity.getPID()).orElse(""),
                                Optional.ofNullable(entity.getSex()).orElse(Gender.MALE),
                                entity.getAge(),
                                summary,
                                Optional.ofNullable(entity.getMemberId()).orElse("unknown"),
                                entity.getRecentDate()
                        );
                        recentHistoryMap.put(pid, history);
                    }
                });

        return new ArrayList<>(recentHistoryMap.values());
    }

    private String updateAgentSummary(String existingAgents, String newAgent) {
        if (existingAgents == null || existingAgents.equals("none")) {
            return Optional.ofNullable(newAgent).orElse("none");
        } else if (newAgent == null || newAgent.isEmpty()) {
            return existingAgents;
        } else {
            return existingAgents + ", " + newAgent;
        }
    }
}
