package com.newmes.cloud.domains.usage.repositoryES;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch._types.aggregations.Aggregate;
import co.elastic.clients.elasticsearch._types.aggregations.CalendarInterval;
import co.elastic.clients.elasticsearch._types.query_dsl.BoolQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import co.elastic.clients.json.JsonData;
import java.io.IOException;
import java.util.Map;
import org.springframework.stereotype.Repository;

@Repository
public class CustomRepositoryImpl implements CustomRepository{

  private final ElasticsearchClient elasticsearchClient;


  public CustomRepositoryImpl(ElasticsearchClient elasticsearchClient) {
    this.elasticsearchClient = elasticsearchClient;
  }

  @Override
  public Map<String, Aggregate> findYearlyTotal() throws IOException {
    Query query = BoolQuery.of(b -> b
        .must(m -> m
            .range(r -> r
                .field("@timestamp")
                .gte(JsonData.of("now-11M/M"))
                .lte(JsonData.of("now/M"))
            )
        )
        .should(s -> s
              .term(t -> t
                  .field("agent.keyword")
                  .value("MedGuru")
              )
          )
          .should(s -> s
              .term(t -> t
                  .field("agent.keyword")
                  .value("CXR")
              )
          )
          .should(s -> s
              .term(t -> t
                  .field("agent.keyword")
                  .value("Capsule")
              )
          )
    )._toQuery();

    SearchResponse<Void> response = elasticsearchClient.search(s -> s
            .index("newmes-cloud-*")
            .size(0)
            .query(query)
            .aggregations("by_agent", a -> a
                .terms(t -> t
                    .field("agent.keyword")
                )
                .aggregations("new_date", da -> da
                    .dateHistogram(dh -> dh
                        .field("@timestamp")
                        .calendarInterval(CalendarInterval.Month)
                        .format("yyyy-MM")
                        .minDocCount(1)
                    )
                )
            ),
        Void.class
    );
    return response.aggregations();
  }

  @Override
  public Map<String, Aggregate> findMonthlyTotal() throws IOException {
    Query query = BoolQuery.of(b -> b
        .must(m -> m
            .range(r -> r
                .field("@timestamp")
                .gte(JsonData.of("now-5w/w"))
                .lte(JsonData.of("now/w"))
            )
        )
        .should(s -> s
            .term(t -> t
                .field("agent.keyword")
                .value("MedGuru")
            )
        )
        .should(s -> s
            .term(t -> t
                .field("agent.keyword")
                .value("CXR")
            )
        )
        .should(s -> s
            .term(t -> t
                .field("agent.keyword")
                .value("Capsule")
            )
        )
    )._toQuery();

    SearchResponse<Void> response = elasticsearchClient.search(s -> s
            .index("newmes-cloud-*")
            .size(0)
            .query(query)
            .aggregations("by_agent", a -> a
                .terms(t -> t
                    .field("agent.keyword")
                )
                .aggregations("new_date", da -> da
                    .dateHistogram(dh -> dh
                        .field("@timestamp")
                        .calendarInterval(CalendarInterval.Week)
                        .format("yyyy-MM-dd")
                        .minDocCount(1)
                    )
                )
            ),
        Void.class
    );
    return response.aggregations();
  }

  @Override
  public Map<String, Aggregate> findWeeklyTotal() throws IOException {
    Query query = BoolQuery.of(b -> b
        .must(m -> m
            .range(r -> r
                .field("@timestamp")
                .gte(JsonData.of("now-7d/d"))
                .lte(JsonData.of("now/d"))
            )
        )
        .should(s -> s
            .term(t -> t
                .field("agent.keyword")
                .value("MedGuru")
            )
        )
        .should(s -> s
            .term(t -> t
                .field("agent.keyword")
                .value("CXR")
            )
        )
        .should(s -> s
            .term(t -> t
                .field("agent.keyword")
                .value("Capsule")
            )
        )
    )._toQuery();

    SearchResponse<Void> response = elasticsearchClient.search(s -> s
            .index("newmes-cloud-*")
            .size(0)
            .query(query)
            .aggregations("by_agent", a -> a
                .terms(t -> t
                    .field("agent.keyword")
                )
                .aggregations("new_date", da -> da
                    .dateHistogram(dh -> dh
                        .field("@timestamp")
                        .calendarInterval(CalendarInterval.Day)
                        .format("yyyy-MM-dd")
                        .minDocCount(1)
                    )
                )
            ),
        Void.class
    );
    return response.aggregations();
  }

  @Override
  public Map<String, Aggregate> total() throws IOException {
    Query query = BoolQuery.of(b -> b
        .should(s -> s
            .term(t -> t
                .field("agent.keyword")
                .value("MedGuru")
            )
        )
        .should(s -> s
            .term(t -> t
                .field("agent.keyword")
                .value("CXR")
            )
        )
        .should(s -> s
            .term(t -> t
                .field("agent.keyword")
                .value("Capsule")
            )
        )
    )._toQuery();

    SearchResponse<Void> response = elasticsearchClient.search(s -> s
            .index("newmes-cloud-*")
            .size(0)
            .query(query)
            .aggregations("by_agent", a -> a
                .terms(t -> t
                .field("agent.keyword")
                )
            ),
        Void.class
    );

    Map<String, Aggregate> aggregations = response.aggregations();
    return aggregations;
  }

  @Override
  public Map<String, Aggregate> findCustomerYearly(String key) throws IOException {
    Query query = BoolQuery.of(b -> b
        .must(m -> m
            .range(r -> r
                .field("@timestamp")
                .gte(JsonData.of("now-11M/M"))
                .lte(JsonData.of("now/M"))
            )
        )
        .must(m -> m
            .term(t -> t
                .field("key.keyword")
                .value(key)
            )
        )
        .should(s -> s
            .term(t -> t
                .field("agent.keyword")
                .value("MedGuru")
            )
        )
        .should(s -> s
            .term(t -> t
                .field("agent.keyword")
                .value("CXR")
            )
        )
        .should(s -> s
            .term(t -> t
                .field("agent.keyword")
                .value("Capsule")
            )
        )
    )._toQuery();

    SearchResponse<Void> response = elasticsearchClient.search(s -> s
            .index("newmes-cloud-*")
            .size(0)
            .query(query)
            .aggregations("by_agent", a -> a
                .terms(t -> t
                    .field("agent.keyword")
                )
                .aggregations("new_date", da -> da
                    .dateHistogram(dh -> dh
                        .field("@timestamp")
                        .calendarInterval(CalendarInterval.Month)
                        .format("yyyy-MM")
                        .minDocCount(1)
                    )
                )
            ),
        Void.class
    );
    Map<String, Aggregate> aggregations = response.aggregations();
    return aggregations;
  }

  @Override
  public Map<String, Aggregate> findCustomerMonthly(String key) throws IOException {
    Query query = BoolQuery.of(b -> b
        .must(m -> m
            .range(r -> r
                .field("@timestamp")
                .gte(JsonData.of("now-5w/w"))
                .lte(JsonData.of("now/w"))
            )
        )
        .must(m -> m
            .term(t -> t
                .field("key.keyword")
                .value(key)
            )
        )
        .should(s -> s
            .term(t -> t
                .field("agent.keyword")
                .value("MedGuru")
            )
        )
        .should(s -> s
            .term(t -> t
                .field("agent.keyword")
                .value("CXR")
            )
        )
        .should(s -> s
            .term(t -> t
                .field("agent.keyword")
                .value("Capsule")
            )
        )
    )._toQuery();

    SearchResponse<Void> response = elasticsearchClient.search(s -> s
            .index("newmes-cloud-*")
            .size(0)
            .query(query)
            .aggregations("by_agent", a -> a
                .terms(t -> t
                    .field("agent.keyword")
                )
                .aggregations("new_date", da -> da
                    .dateHistogram(dh -> dh
                        .field("@timestamp")
                        .calendarInterval(CalendarInterval.Week)
                        .format("yyyy-MM-dd")
                        .minDocCount(1)
                    )
                )
            ),
        Void.class
    );
    Map<String, Aggregate> aggregations = response.aggregations();
    return aggregations;
  }

  @Override
  public Map<String, Aggregate> findCustomerWeekly(String key) throws IOException {
    Query query = BoolQuery.of(b -> b
        .must(m -> m
            .range(r -> r
                .field("@timestamp")
                .gte(JsonData.of("now-7d/d"))
                .lte(JsonData.of("now/d"))
            )
        )
        .must(m -> m
            .term(t -> t
                .field("key.keyword")
                .value(key)
            )
        )
        .should(s -> s
            .term(t -> t
                .field("agent.keyword")
                .value("MedGuru")
            )
        )
        .should(s -> s
            .term(t -> t
                .field("agent.keyword")
                .value("CXR")
            )
        )
        .should(s -> s
            .term(t -> t
                .field("agent.keyword")
                .value("Capsule")
            )
        )
    )._toQuery();

    SearchResponse<Void> response = elasticsearchClient.search(s -> s
            .index("newmes-cloud-*")
            .size(0)
            .query(query)
            .aggregations("by_agent", a -> a
                .terms(t -> t
                    .field("agent.keyword")
                )
                .aggregations("new_date", da -> da
                    .dateHistogram(dh -> dh
                        .field("@timestamp")
                        .calendarInterval(CalendarInterval.Day)
                        .format("yyyy-MM")
                        .minDocCount(1)
                    )
                )
            ),
        Void.class
    );
    Map<String, Aggregate> aggregations = response.aggregations();
    return aggregations;
  }

  @Override
  public Map<String, Aggregate> customerYearlyTotal(String key) throws IOException {
    Query query = BoolQuery.of(b -> b
        .must(m -> m
            .range(r -> r
                .field("@timestamp")
                .gte(JsonData.of("now-365d/d"))
                .lte(JsonData.of("now/d"))
            )
        )
        .must(m -> m
            .term(t -> t
                .field("key.keyword")
                .value(key)
            )
        )
        .should(s -> s
            .term(t -> t
                .field("agent.keyword")
                .value("MedGuru")
            )
        )
        .should(s -> s
            .term(t -> t
                .field("agent.keyword")
                .value("CXR")
            )
        )
        .should(s -> s
            .term(t -> t
                .field("agent.keyword")
                .value("Capsule")
            )
        )
    )._toQuery();

    SearchResponse<Void> response = elasticsearchClient.search(s -> s
            .index("newmes-cloud-*")
            .size(0)
            .query(query)
            .aggregations("by_agent", a -> a
                .terms(t -> t
                    .field("agent.keyword")
                )
            ),
        Void.class
    );

    Map<String, Aggregate> aggregations = response.aggregations();
    return aggregations;
  }

  @Override
  public Map<String, Aggregate> customerMonthlyTotal(String key) throws IOException {
    Query query = BoolQuery.of(b -> b
        .must(m -> m
            .range(r -> r
                .field("@timestamp")
                .gte(JsonData.of("now-30d/d"))
                .lte(JsonData.of("now/d"))
            )
        )
        .must(m -> m
            .term(t -> t
                .field("key.keyword")
                .value(key)
            )
        )
        .should(s -> s
            .term(t -> t
                .field("agent.keyword")
                .value("MedGuru")
            )
        )
        .should(s -> s
            .term(t -> t
                .field("agent.keyword")
                .value("CXR")
            )
        )
        .should(s -> s
            .term(t -> t
                .field("agent.keyword")
                .value("Capsule")
            )
        )
    )._toQuery();

    SearchResponse<Void> response = elasticsearchClient.search(s -> s
            .index("newmes-cloud-*")
            .size(0)
            .query(query)
            .aggregations("by_agent", a -> a
                .terms(t -> t
                    .field("agent.keyword")
                )
            ),
        Void.class
    );

    Map<String, Aggregate> aggregations = response.aggregations();
    return aggregations;
  }

  @Override
  public Map<String, Aggregate> customerWeeklyTotal(String key) throws IOException {
    Query query = BoolQuery.of(b -> b
        .must(m -> m
            .range(r -> r
                .field("@timestamp")
                .gte(JsonData.of("now-7d/d"))
                .lte(JsonData.of("now/d"))
            )
        )
        .must(m -> m
            .term(t -> t
                .field("key.keyword")
                .value(key)
            )
        )
        .should(s -> s
            .term(t -> t
                .field("agent.keyword")
                .value("MedGuru")
            )
        )
        .should(s -> s
            .term(t -> t
                .field("agent.keyword")
                .value("CXR")
            )
        )
        .should(s -> s
            .term(t -> t
                .field("agent.keyword")
                .value("Capsule")
            )
        )
    )._toQuery();

    SearchResponse<Void> response = elasticsearchClient.search(s -> s
            .index("newmes-cloud-*")
            .size(0)
            .query(query)
            .aggregations("by_agent", a -> a
                .terms(t -> t
                    .field("agent.keyword")
                )
            ),
        Void.class
    );

    Map<String, Aggregate> aggregations = response.aggregations();
    return aggregations;
  }


}
