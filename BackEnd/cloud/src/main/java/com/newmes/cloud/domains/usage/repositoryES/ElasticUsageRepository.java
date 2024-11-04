package com.newmes.cloud.domains.usage.repositoryES;

import com.newmes.cloud.domains.usage.dto.response.AgentAggregationResult;
import java.util.List;
import org.springframework.data.elasticsearch.annotations.Query;
import com.newmes.cloud.domains.usage.dto.response.AgentCounts;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository("elasticUsageRepositoryES")
public interface ElasticUsageRepository extends ElasticsearchRepository<AgentCounts, String> {

  @Query("{\"size\":0,\"query\":{\"bool\":{\"must\":[{\"range\":{\"@timestamp\":{\"gte\":\"now-11M/M\",\"lte\":\"now/M\"}}},{\"terms\":{\"agent.keyword\":[\"CXR\",\"MedGuru\",\"Capsule\"]}}]}},{\"aggs\":{\"by_agent\":{\"terms\":{\"field\":\"agent.keyword\"},\"aggs\":{\"new_date\":{\"date_histogram\":{\"field\":\"@timestamp\",\"calendar_interval\":\"month\",\"format\":\"yyyy-MM\",\"min_doc_count\":1}}}}}}}")
  List<AgentCounts> findYearlyTotal();

  @Query("{\"size\":0,\"query\":{\"bool\":{\"must\":[{\"range\":{\"@timestamp\":{\"gte\":\"now-30d/d\",\"lte\":\"now/d\"}}},{\"terms\":{\"agent.keyword\":[\"MedGuru\",\"CXR\",\"Capsule\"]}}]},\"aggs\":{\"by_agent\":{\"terms\":{\"field\":\"agent.keyword\"},\"aggs\":{\"counts\":{\"date_histogram\":{\"field\":\"@timestamp\",\"calendar_interval\":\"week\",\"offset\":\"+0d\",\"format\":\"yyyy-MM-dd\",\"min_doc_count\":1}}}}}}")
  List<AgentCounts> findMonthlyTotal();

  @Query("{\"size\":0,\"query\":{\"bool\":{\"must\":[{\"range\":{\"@timestamp\":{\"gte\":\"now-7d/d\",\"lte\":\"now/d\"}}},{\"terms\":{\"agent.keyword\":[\"MedGuru\",\"CXR\",\"Capsule\"]}}]},\"aggs\":{\"by_agent\":{\"terms\":{\"field\":\"agent.keyword\"},\"aggs\":{\"counts\":{\"date_histogram\":{\"field\":\"@timestamp\",\"calendar_interval\":\"day\",\"offset\":\"+0d\",\"format\":\"yyyy-MM-dd\",\"min_doc_count\":1}}}}}}}")
  List<AgentCounts> findWeeklyTotal();

  @Query("{\"size\": 0, \"aggs\": {\"by_agent\": {\"terms\": {\"field\": \"agent.keyword\"}}}}\n")
  List<AgentAggregationResult> total();

  @Query("{\"size\": 0, \"query\": {\"bool\": {\"must\": [{\"range\": {\"@timestamp\": {\"gte\": \"now-11M/M\", \"lte\": \"now/M\"}}}, {\"terms\": {\"agent.keyword\": [\"CXR\", \"MedGuru\", \"Capsule\"]}}, {\"term\": {\"key.keyword\": \"?0\"}}]}}, \"aggs\": {\"by_agent\": {\"terms\": {\"field\": \"agent.keyword\"}, \"aggs\": {\"new_date\": {\"date_histogram\": {\"field\": \"@timestamp\", \"calendar_interval\": \"month\", \"format\": \"yyyy-MM\", \"min_doc_count\": 1}}}}}}")
  List<AgentCounts> findCustomerYearly(String key);

  @Query("{\"size\":0,\"query\":{\"bool\":{\"must\":[{\"range\":{\"@timestamp\":{\"gte\":\"now-30d/d\",\"lte\":\"now/d\"}}},{\"terms\":{\"agent.keyword\":[\"MedGuru\",\"CXR\",\"Capsule\"]}},{\"term\":{\"key.keyword\":\"?0\"}}]}},\"aggs\":{\"by_agent\":{\"terms\":{\"field\":\"agent.keyword\"},\"aggs\":{\"counts\":{\"date_histogram\":{\"field\":\"@timestamp\",\"calendar_interval\":\"week\",\"offset\":\"+0d\",\"format\":\"yyyy-MM-dd\",\"min_doc_count\":1}}}}}}")
  List<AgentCounts> findCustomerMonthly(String key);

  @Query("{\"size\":0,\"query\":{\"bool\":{\"must\":[{\"range\":{\"@timestamp\":{\"gte\":\"now-7d/d\",\"lte\":\"now/d\"}}},{\"terms\":{\"agent.keyword\":[\"MedGuru\",\"CXR\",\"Capsule\"]}},{\"term\":{\"key.keyword\":\"?0\"}}]}},\"aggs\":{\"by_agent\":{\"terms\":{\"field\":\"agent.keyword\"},\"aggs\":{\"counts\":{\"date_histogram\":{\"field\":\"@timestamp\",\"calendar_interval\":\"day\",\"offset\":\"+0d\",\"format\":\"yyyy-MM-dd\",\"min_doc_count\":1}}}}}}")
  List<AgentCounts> findCustomerWeekly(String key);

  @Query("{\"size\": 0, \"query\": {\"bool\": {\"must\": [{\"range\": {\"@timestamp\": {\"gte\": \"now-11M/M\", \"lte\": \"now/M\"}}}, {\"term\": {\"key.keyword\": \"?0\"}}]}}, \"aggs\": {\"by_agent\": {\"terms\": {\"field\": \"agent.keyword\"}}}}\n")
  List<AgentAggregationResult> customerYearlyTotal(String key);

  @Query("{\"size\": 0, \"query\": {\"bool\": {\"must\": [{\"range\": {\"@timestamp\": {\"gte\":\"now-30d/d\",\"lte\":\"now/d\"}}}, {\"term\": {\"key.keyword\": \"?0\"}}]}}, \"aggs\": {\"by_agent\": {\"terms\": {\"field\": \"agent.keyword\"}}}}\n")
  List<AgentAggregationResult> customerMonthlyTotal(String key);

  @Query("{\"size\": 0, \"query\": {\"bool\": {\"must\": [{\"range\": {\"@timestamp\": {\"gte\": \"now-7d/d\", \"lte\": \"now/d\"}}}, {\"term\": {\"key.keyword\": \"?0\"}}]}}, \"aggs\": {\"by_agent\": {\"terms\": {\"field\": \"agent.keyword\"}}}}\n")
  List<AgentAggregationResult> customerWeeklyTotal(String key);
}
