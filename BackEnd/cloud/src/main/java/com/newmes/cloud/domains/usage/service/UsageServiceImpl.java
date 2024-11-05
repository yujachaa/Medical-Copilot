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
import com.newmes.cloud.domains.usage.repositoryES.CustomRepository;
import com.newmes.cloud.global.kafka.producer.UsageProducer;
import java.io.IOException;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
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
    private final CustomRepository customESRepository;

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
    public List<CountResponse> total() throws IOException {
        Map<String, Aggregate> aggregations = customESRepository.total();
        List<CountResponse> list = new ArrayList<>();
        if (aggregations.isEmpty()){
            System.out.println("Empty");
        }else{
            Aggregate agg = aggregations.get("by_agent");
            if (agg != null && agg.isSterms()) {
                StringTermsAggregate termsAgg = agg.sterms();
                for (StringTermsBucket bucket : termsAgg.buckets().array()) {
                    list.add(new CountResponse(bucket.key().stringValue(), bucket.docCount()));
                }
            } else {
                System.out.println("No terms aggregation found.");
            }
        }
        return list;
    }

    @Override
    public YearlyResponse yearly() throws IOException {
        Map<String, Aggregate> aggregations = customESRepository.findYearlyTotal();
        YearlyResponse yearlyResponse = new YearlyResponse();
        LocalDate now = LocalDate.now();
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
                        LocalDate specDate = instant.atZone(ZoneId.of("GMT")).toLocalDate();
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
        LocalDate now = LocalDate.now();
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
                        LocalDate specDate = instant.atZone(ZoneId.of("GMT")).toLocalDate();
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
        LocalDate now = LocalDate.now();
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
                        LocalDate specDate = instant.atZone(ZoneId.of("GMT")).toLocalDate();
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
        LocalDate now = LocalDate.now();
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
                        LocalDate specDate = instant.atZone(ZoneId.of("GMT")).toLocalDate();
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
        LocalDate now = LocalDate.now();
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
                        LocalDate specDate = instant.atZone(ZoneId.of("GMT")).toLocalDate();
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
        LocalDate now = LocalDate.now();
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
                        LocalDate specDate = instant.atZone(ZoneId.of("GMT")).toLocalDate();
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
    public List<CountResponse> customerYearlyTotal(String key) throws IOException {
        Map<String, Aggregate> aggregations = customESRepository.customerYearlyTotal(key);
        List<CountResponse> list = new ArrayList<>();
        if (aggregations.isEmpty()){
            System.out.println("Empty");
        }else{
            Aggregate agg = aggregations.get("by_agent");
            if (agg != null && agg.isSterms()) {
                StringTermsAggregate termsAgg = agg.sterms();
                for (StringTermsBucket bucket : termsAgg.buckets().array()) {
                    list.add(new CountResponse(bucket.key().stringValue(), bucket.docCount()));
                }
            } else {
                System.out.println("No terms aggregation found.");
            }
        }
        return list;
    }

    @Override
    public List<CountResponse> customerMonthlyTotal(String key) throws IOException {
        Map<String, Aggregate> aggregations = customESRepository.customerMonthlyTotal(key);
        List<CountResponse> list = new ArrayList<>();
        if (aggregations.isEmpty()){
            System.out.println("Empty");
        }else{
            Aggregate agg = aggregations.get("by_agent");
            if (agg != null && agg.isSterms()) {
                StringTermsAggregate termsAgg = agg.sterms();
                for (StringTermsBucket bucket : termsAgg.buckets().array()) {
                    list.add(new CountResponse(bucket.key().stringValue(), bucket.docCount()));
                }
            } else {
                System.out.println("No terms aggregation found.");
            }
        }
        return list;
    }

    @Override
    public List<CountResponse> customerWeeklyTotal(String key) throws IOException {
        Map<String, Aggregate> aggregations = customESRepository.customerWeeklyTotal(key);
        List<CountResponse> list = new ArrayList<>();
        if (aggregations.isEmpty()){
            System.out.println("Empty");
        }else{
            Aggregate agg = aggregations.get("by_agent");
            if (agg != null && agg.isSterms()) {
                StringTermsAggregate termsAgg = agg.sterms();
                for (StringTermsBucket bucket : termsAgg.buckets().array()) {
                    list.add(new CountResponse(bucket.key().stringValue(), bucket.docCount()));
                }
            } else {
                System.out.println("No terms aggregation found.");
            }
        }
        return list;
    }


}
