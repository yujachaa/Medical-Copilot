package com.newmes.cloud.domains.usage.service;

import com.newmes.cloud.domains.corporate.domain.Corporate;
import com.newmes.cloud.domains.corporate.exception.CorporateNotFoundException;
import com.newmes.cloud.domains.corporate.repository.CorporateRepository;
import com.newmes.cloud.domains.usage.domain.AgentUsageLog;
import com.newmes.cloud.domains.usage.dto.request.UsageRequestDto;
import com.newmes.cloud.domains.usage.dto.response.AgentAggregationResult;
import com.newmes.cloud.domains.usage.dto.response.AgentCounts;
import com.newmes.cloud.domains.usage.dto.response.AgentCounts.UsageData;
import com.newmes.cloud.domains.usage.repositoryES.ElasticUsageRepository;
import com.newmes.cloud.global.kafka.producer.UsageProducer;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


import java.util.concurrent.CompletableFuture;

@RequiredArgsConstructor
@Service
public class UsageServiceImpl implements UsageService{

    private final CorporateRepository corporateRepository;
    private final UsageProducer kafkaProducerService;
    private final ElasticUsageRepository elasticUsageRepository;

    public CompletableFuture<String> processAgentUsage(UsageRequestDto requestDto) {
        Corporate corporate = Corporate.fromEntity(
                corporateRepository.findByKey(requestDto.key())
                        .orElseThrow(() -> new CorporateNotFoundException("Invalid key: " + requestDto.key()))
        );

        AgentUsageLog result = AgentUsageLog.builder()
                .id(corporate.getId())
                .key(requestDto.key())
                .agent(requestDto.agent())
                .grade(corporate.getGrade())
                .build();

        return kafkaProducerService.sendAgentUsage(result);
    }


    @Override
    public Map<String, Long> total() {
        List<AgentAggregationResult> count = elasticUsageRepository.total();
        Map<String, Long> map = new HashMap<>();
        for (AgentAggregationResult a : count){
            String name = a.getKey();
            long usages = a.getDocCount();
            map.put(name, usages);
        }
        return map;
    }

    @Override
    public Map<String, long[]> yearly() {
        Map<String, long[]> map = new HashMap<>();
        List<AgentCounts> count = elasticUsageRepository.findYearlyTotal();
        for (AgentCounts agent : count){
            String agentName = agent.getKey();
            List<UsageData> data = agent.getCounts();
            LocalDate now = LocalDate.now();

            long[] months = new long[12];
            for (UsageData usageData : data){
                LocalDate specDate = usageData.getDate();
                int monthDiff = 11 - (int) Math.abs(ChronoUnit.MONTHS.between(specDate, now));
                months[monthDiff] = usageData.getDocCount();
            }
            map.put(agentName, months);
        }
        return map;
    }

    @Override
    public Map<String, long[]> monthly() {
        Map<String, long[]> map = new HashMap<>();
        List<AgentCounts> count = elasticUsageRepository.findMonthlyTotal();
        for (AgentCounts agent : count){
            String agentName = agent.getKey();
            List<UsageData> data = agent.getCounts();
            LocalDate now = LocalDate.now();

            long[] weeks = new long[5];
            for (UsageData usageData : data){
                LocalDate specDate = usageData.getDate();
                int weeksBetween = 4 - (int) Math.abs(ChronoUnit.WEEKS.between(specDate, now));
                weeks[weeksBetween] = usageData.getDocCount();
            }
            map.put(agentName, weeks);
        }
        return map;
    }

    @Override
    public Map<String, long[]> weekly() {
        Map<String, long[]> map = new HashMap<>();
        List<AgentCounts> count = elasticUsageRepository.findWeeklyTotal();
        for (AgentCounts agent : count){
            String agentName = agent.getKey();
            List<UsageData> data = agent.getCounts();
            LocalDate now = LocalDate.now();

            long[] weeks = new long[7];
            for (UsageData usageData : data){
                LocalDate specDate = usageData.getDate();
                int weeksBetween = 6 - (int) Math.abs(ChronoUnit.DAYS.between(specDate, now));
                weeks[weeksBetween] = usageData.getDocCount();
            }
            map.put(agentName, weeks);
        }
        return map;
    }

    @Override
    public Map<String, long[]> customerYearly(String key) {
        Map<String, long[]> map = new HashMap<>();
        List<AgentCounts> count = elasticUsageRepository.findCustomerYearly(key);
        for (AgentCounts agent : count){
            String agentName = agent.getKey();
            List<UsageData> data = agent.getCounts();
            LocalDate now = LocalDate.now();

            long[] months = new long[12];
            for (UsageData usageData : data){
                LocalDate specDate = usageData.getDate();
                int monthDiff = 11 - (int) Math.abs(ChronoUnit.MONTHS.between(specDate, now));
                months[monthDiff] = usageData.getDocCount();
            }
            map.put(agentName, months);
        }
        return map;
    }

    @Override
    public Map<String, long[]> customerMonthly(String key) {
        Map<String, long[]> map = new HashMap<>();
        List<AgentCounts> count = elasticUsageRepository.findCustomerMonthly(key);
        for (AgentCounts agent : count){
            String agentName = agent.getKey();
            List<UsageData> data = agent.getCounts();
            LocalDate now = LocalDate.now();

            long[] weeks = new long[5];
            for (UsageData usageData : data){
                LocalDate specDate = usageData.getDate();
                int weeksBetween = 4 - (int) Math.abs(ChronoUnit.WEEKS.between(specDate, now));
                weeks[weeksBetween] = usageData.getDocCount();
            }
            map.put(agentName, weeks);
        }
        return map;
    }

    @Override
    public Map<String, long[]> customerWeekly(String key) {
        Map<String, long[]> map = new HashMap<>();
        List<AgentCounts> count = elasticUsageRepository.findCustomerWeekly(key);
        for (AgentCounts agent : count){
            String agentName = agent.getKey();
            List<UsageData> data = agent.getCounts();
            LocalDate now = LocalDate.now();

            long[] weeks = new long[7];
            for (UsageData usageData : data){
                LocalDate specDate = usageData.getDate();
                int weeksBetween = 6 - (int) Math.abs(ChronoUnit.DAYS.between(specDate, now));
                weeks[weeksBetween] = usageData.getDocCount();
            }
            map.put(agentName, weeks);
        }
        return map;
    }

    @Override
    public Map<String, Long> customerYearlyTotal(String key) {
        List<AgentAggregationResult> count = elasticUsageRepository.customerYearlyTotal(key);
        Map<String, Long> map = new HashMap<>();
        for (AgentAggregationResult a : count){
            String name = a.getKey();
            long usages = a.getDocCount();
            map.put(name, usages);
        }
        return map;
    }

    @Override
    public Map<String, Long> customerMonthlyTotal(String key) {
        List<AgentAggregationResult> count = elasticUsageRepository.customerMonthlyTotal(key);
        Map<String, Long> map = new HashMap<>();
        for (AgentAggregationResult a : count){
            String name = a.getKey();
            long usages = a.getDocCount();
            map.put(name, usages);
        }
        return map;
    }

    @Override
    public Map<String, Long> customerWeeklyTotal(String key) {
        List<AgentAggregationResult> count = elasticUsageRepository.customerWeeklyTotal(key);
        Map<String, Long> map = new HashMap<>();
        for (AgentAggregationResult a : count){
            String name = a.getKey();
            long usages = a.getDocCount();
            map.put(name, usages);
        }
        return map;
    }

}
