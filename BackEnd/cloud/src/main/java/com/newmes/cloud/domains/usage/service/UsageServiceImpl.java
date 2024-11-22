package com.newmes.cloud.domains.usage.service;

import co.elastic.clients.elasticsearch._types.aggregations.Aggregate;
import co.elastic.clients.elasticsearch._types.aggregations.DateHistogramAggregate;
import co.elastic.clients.elasticsearch._types.aggregations.DateHistogramBucket;
import co.elastic.clients.elasticsearch._types.aggregations.StringTermsAggregate;
import co.elastic.clients.elasticsearch._types.aggregations.StringTermsBucket;
import com.newmes.cloud.domains.corporate.domain.Corporate;
import com.newmes.cloud.domains.corporate.exception.CorporateNotFoundException;
import com.newmes.cloud.domains.corporate.repository.CorporateRepository;
import com.newmes.cloud.domains.usage.domain.AgentUsageLog;
import com.newmes.cloud.domains.usage.dto.request.UsageRequestDto;
import com.newmes.cloud.domains.usage.dto.response.CountResponse;
import com.newmes.cloud.domains.usage.dto.response.MonthlyResponse;
import com.newmes.cloud.domains.usage.dto.response.WeeklyResponse;
import com.newmes.cloud.domains.usage.dto.response.YearlyResponse;
import com.newmes.cloud.domains.usage.entity.UsageEntity;
import com.newmes.cloud.domains.usage.repository.UsageRepository;
import com.newmes.cloud.domains.usage.repositoryES.CustomRepository;
import com.newmes.cloud.global.kafka.producer.UsageProducer;

import java.io.IOException;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Map;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;


import java.util.concurrent.CompletableFuture;

import static net.logstash.logback.argument.StructuredArguments.kv;

@RequiredArgsConstructor
@Service
public class UsageServiceImpl implements UsageService{

    private final CorporateRepository corporateRepository;
    private final UsageProducer kafkaProducerService;
    private final CustomRepository customESRepository;
    private final UsageRepository usageRepository;
    private static final Logger logger = LoggerFactory.getLogger(UsageServiceImpl.class);

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
    public void CountAgent(UsageRequestDto requestDto){
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

        logger.info("Business Log: Usage update successful",
                kv("corpKey", result.getKey()),
                kv("grade", result.getGrade()),
                kv("totalCount", ""),
                kv("agent", result.getAgent().toString()));

    }

    @Override
    public int getQuota(String key){
        UsageEntity entity = usageRepository.findByCorporateKey(key)
                .orElseThrow(() -> new CorporateNotFoundException("Invalid key: " + key));
        return entity.getAgentCount();
    }



    @Override
    public CountResponse total() throws IOException {
        Map<String, Aggregate> aggregations = customESRepository.total();
        CountResponse response = new CountResponse();
        if (aggregations.isEmpty()){
            System.out.println("Empty");
        }else{
            Aggregate agg = aggregations.get("by_agent");
            if (agg != null && agg.isSterms()) {
                StringTermsAggregate termsAgg = agg.sterms();
                for (StringTermsBucket bucket : termsAgg.buckets().array()) {
                    response.add(bucket.key().stringValue(), bucket.docCount());
                }
            } else {
                System.out.println("No terms aggregation found.");
            }
        }
        return response;
    }

    @Override
    public YearlyResponse yearly() throws IOException {
        Map<String, Aggregate> aggregations = customESRepository.findYearlyTotal();
        YearlyResponse yearlyResponse = new YearlyResponse();
        LocalDate now = LocalDate.now(ZoneOffset.UTC);
        if (aggregations.isEmpty()){
            System.out.println("Empty");
        }else{
            Aggregate agg = aggregations.get("by_agent");
            if (agg != null && agg.isSterms()) {  // 단어 집계(S)인지 확인
                StringTermsAggregate termsAgg = agg.sterms();
                for (StringTermsBucket bucket : termsAgg.buckets().array()) {
                    String agentName = bucket.key().stringValue();
                    long[] counts = new long[12];
                    Aggregate dates = bucket.aggregations().get("new_date");
                    DateHistogramAggregate dateAgg = dates.dateHistogram();
                    for (DateHistogramBucket dateBucket : dateAgg.buckets().array()) {
                        Instant instant = Instant.ofEpochMilli((long) dateBucket.key());
                        LocalDate specDate = instant.atZone(ZoneId.of("UTC")).toLocalDate();
                        int monthDiff = 11 - (int) Math.abs(ChronoUnit.MONTHS.between(specDate, now));
                        counts[monthDiff] = dateBucket.docCount();
                    }
                    yearlyResponse.add(agentName, counts);
                }
            } else {
                System.out.println("No terms aggregation found.");
            }
        }
        return yearlyResponse;
    }

    @Override
    public MonthlyResponse monthly() throws IOException {
        Map<String, Aggregate> aggregations = customESRepository.findMonthlyTotal();
        MonthlyResponse monthlyResponse = new MonthlyResponse();
        LocalDate now = LocalDate.now(ZoneOffset.UTC);
        if (aggregations.isEmpty()){
            System.out.println("Empty");
        }else{
            Aggregate agg = aggregations.get("by_agent");
            if (agg != null && agg.isSterms()) {
                StringTermsAggregate termsAgg = agg.sterms();
                for (StringTermsBucket bucket : termsAgg.buckets().array()) {
                    String agentName = bucket.key().stringValue();
                    long[] counts = new long[5];
                    Aggregate dates = bucket.aggregations().get("new_date");
                    DateHistogramAggregate dateAgg = dates.dateHistogram();
                    for (DateHistogramBucket dateBucket : dateAgg.buckets().array()) {
                        Instant instant = Instant.ofEpochMilli(dateBucket.key());
                        LocalDate specDate = instant.atZone(ZoneId.of("UTC")).toLocalDate();
                        int weekDiff = 4 - (int) Math.abs(ChronoUnit.WEEKS.between(specDate, now));
                        counts[weekDiff] = dateBucket.docCount();
                    }
                    monthlyResponse.add(agentName, counts);
                }
            } else {
                System.out.println("No terms aggregation found.");
            }
        }
        return monthlyResponse;

    }

    @Override
    public WeeklyResponse weekly() throws IOException {
        Map<String, Aggregate> aggregations = customESRepository.findWeeklyTotal();
        WeeklyResponse weeklyResponse = new WeeklyResponse();
        LocalDate now = LocalDate.now(ZoneOffset.UTC);
        if (aggregations.isEmpty()){
            System.out.println("Empty");
        }else{
            Aggregate agg = aggregations.get("by_agent");
            if (agg != null && agg.isSterms()) {
                StringTermsAggregate termsAgg = agg.sterms();
                for (StringTermsBucket bucket : termsAgg.buckets().array()) {
                    String agentName = bucket.key().stringValue();
                    long[] counts = new long[7];
                    Aggregate dates = bucket.aggregations().get("new_date");
                    DateHistogramAggregate dateAgg = dates.dateHistogram();
                    for (DateHistogramBucket dateBucket : dateAgg.buckets().array()) {
                        Instant instant = Instant.ofEpochMilli(dateBucket.key());
                        LocalDate specDate = instant.atZone(ZoneId.of("UTC")).toLocalDate();
                        int dayDiff = 6 - (int) Math.abs(ChronoUnit.DAYS.between(specDate, now));
                        counts[dayDiff] = dateBucket.docCount();
                    }
                    weeklyResponse.add(agentName, counts);
                }
            } else {
                System.out.println("No terms aggregation found.");
            }
        }
        return weeklyResponse;
    }

    @Override
    public YearlyResponse customerYearly(String key) throws IOException {
        Map<String, Aggregate> aggregations = customESRepository.findCustomerYearly(key);
        YearlyResponse yearlyResponse = new YearlyResponse();
        LocalDate now = LocalDate.now(ZoneOffset.UTC);
        if (aggregations.isEmpty()){
            System.out.println("Empty");
        }else{
            Aggregate agg = aggregations.get("by_agent");
            if (agg != null && agg.isSterms()) {  // 단어 집계(S)인지 확인
                StringTermsAggregate termsAgg = agg.sterms();
                for (StringTermsBucket bucket : termsAgg.buckets().array()) {
                    String agentName = bucket.key().stringValue();
                    long[] counts = new long[12];
                    Aggregate dates = bucket.aggregations().get("new_date");
                    DateHistogramAggregate dateAgg = dates.dateHistogram();
                    for (DateHistogramBucket dateBucket : dateAgg.buckets().array()) {
                        Instant instant = Instant.ofEpochMilli((long) dateBucket.key());
                        LocalDate specDate = instant.atZone(ZoneId.of("UTC")).toLocalDate();
                        int monthDiff = 11 - (int) Math.abs(ChronoUnit.MONTHS.between(specDate, now));
                        counts[monthDiff] = dateBucket.docCount();
                    }
                    yearlyResponse.add(agentName, counts);
                }
            } else {
                System.out.println("No terms aggregation found.");
            }
        }
        return yearlyResponse;
    }

    @Override
    public MonthlyResponse customerMonthly(String key) throws IOException {
        Map<String, Aggregate> aggregations = customESRepository.findCustomerMonthly(key);
        MonthlyResponse monthlyResponse = new MonthlyResponse();
        LocalDate now = LocalDate.now(ZoneOffset.UTC);
        if (aggregations.isEmpty()){
            System.out.println("Empty");
        }else{
            Aggregate agg = aggregations.get("by_agent");
            if (agg != null && agg.isSterms()) {
                StringTermsAggregate termsAgg = agg.sterms();
                for (StringTermsBucket bucket : termsAgg.buckets().array()) {
                    String agentName = bucket.key().stringValue();
                    long[] counts = new long[5];
                    Aggregate dates = bucket.aggregations().get("new_date");
                    DateHistogramAggregate dateAgg = dates.dateHistogram();
                    for (DateHistogramBucket dateBucket : dateAgg.buckets().array()) {
                        Instant instant = Instant.ofEpochMilli(dateBucket.key());
                        LocalDate specDate = instant.atZone(ZoneId.of("UTC")).toLocalDate();
                        int weekDiff = 4 - (int) Math.abs(ChronoUnit.WEEKS.between(specDate, now));
                        counts[weekDiff] = dateBucket.docCount();
                    }
                    monthlyResponse.add(agentName, counts);
                }
            } else {
                System.out.println("No terms aggregation found.");
            }
        }
        return monthlyResponse;
    }

    @Override
    public WeeklyResponse customerWeekly(String key) throws IOException {
        Map<String, Aggregate> aggregations = customESRepository.findCustomerWeekly(key);
        WeeklyResponse weeklyResponse = new WeeklyResponse();
        LocalDate now = LocalDate.now(ZoneOffset.UTC);
        if (aggregations.isEmpty()){
            System.out.println("Empty");
        }else{
            Aggregate agg = aggregations.get("by_agent");
            if (agg != null && agg.isSterms()) {
                StringTermsAggregate termsAgg = agg.sterms();
                for (StringTermsBucket bucket : termsAgg.buckets().array()) {
                    String agentName = bucket.key().stringValue();
                    long[] counts = new long[7];
                    Aggregate dates = bucket.aggregations().get("new_date");
                    DateHistogramAggregate dateAgg = dates.dateHistogram();
                    for (DateHistogramBucket dateBucket : dateAgg.buckets().array()) {
                        Instant instant = Instant.ofEpochMilli(dateBucket.key());
                        LocalDate specDate = instant.atZone(ZoneId.of("UTC")).toLocalDate();
                        int dayDiff = 6 - (int) Math.abs(ChronoUnit.DAYS.between(specDate, now));
                        counts[dayDiff] = dateBucket.docCount();
                    }
                    weeklyResponse.add(agentName, counts);
                }
            } else {
                System.out.println("No terms aggregation found.");
            }
        }
        return weeklyResponse;
    }

    @Override
    public CountResponse customerYearlyTotal(String key) throws IOException {
        Map<String, Aggregate> aggregations = customESRepository.customerYearlyTotal(key);
        CountResponse response = new CountResponse();
        if (aggregations.isEmpty()){
            System.out.println("Empty");
        }else{
            Aggregate agg = aggregations.get("by_agent");
            if (agg != null && agg.isSterms()) {
                StringTermsAggregate termsAgg = agg.sterms();
                for (StringTermsBucket bucket : termsAgg.buckets().array()) {
                    response.add(bucket.key().stringValue(), bucket.docCount());
                }
            } else {
                System.out.println("No terms aggregation found.");
            }
        }
        return response;
    }

    @Override
    public CountResponse customerMonthlyTotal(String key) throws IOException {
        Map<String, Aggregate> aggregations = customESRepository.customerMonthlyTotal(key);
        CountResponse response = new CountResponse();
        if (aggregations.isEmpty()){
            System.out.println("Empty");
        }else{
            Aggregate agg = aggregations.get("by_agent");
            if (agg != null && agg.isSterms()) {
                StringTermsAggregate termsAgg = agg.sterms();
                for (StringTermsBucket bucket : termsAgg.buckets().array()) {
                    response.add(bucket.key().stringValue(), bucket.docCount());
                }
            } else {
                System.out.println("No terms aggregation found.");
            }
        }
        return response;
    }

    @Override
    public CountResponse customerWeeklyTotal(String key) throws IOException {
        Map<String, Aggregate> aggregations = customESRepository.customerWeeklyTotal(key);
        CountResponse response = new CountResponse();
        if (aggregations.isEmpty()){
            System.out.println("Empty");
        }else{
            Aggregate agg = aggregations.get("by_agent");
            if (agg != null && agg.isSterms()) {
                StringTermsAggregate termsAgg = agg.sterms();
                for (StringTermsBucket bucket : termsAgg.buckets().array()) {
                    response.add(bucket.key().stringValue(), bucket.docCount());
                }
            } else {
                System.out.println("No terms aggregation found.");
            }
        }
        return response;
    }

    @Override
    public long weeklyTokenCount(String key) throws IOException {
        return customESRepository.weeklyTokenCount(key);
    }

    @Override
    public void increaseUsage(String key){
        UsageEntity entity = usageRepository.findByCorporateKey(key)
                .orElseThrow(() -> new CorporateNotFoundException("Invalid key: " + key));

        entity.incrementAgentCount();
        usageRepository.save(entity);
    }


    @Scheduled(cron = "0 0 2 * * MON", zone = "Asia/Seoul")
    public void initEntities() {
        List<UsageEntity> usageEntities = usageRepository.findAll();

        for (UsageEntity entity : usageEntities) {
            try {
                entity.initAgentCount();
                usageRepository.save(entity);
            } catch (Exception e) {

            }
        }

    }
}
