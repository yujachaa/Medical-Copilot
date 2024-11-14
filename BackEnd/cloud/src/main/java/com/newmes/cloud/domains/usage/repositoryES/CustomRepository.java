package com.newmes.cloud.domains.usage.repositoryES;

import co.elastic.clients.elasticsearch._types.aggregations.Aggregate;
import java.io.IOException;
import java.util.Map;

public interface CustomRepository {

  Map<String, Aggregate>  findYearlyTotal() throws IOException;

  Map<String, Aggregate> findMonthlyTotal() throws IOException;

  Map<String, Aggregate> findWeeklyTotal() throws IOException;

  Map<String, Aggregate> total() throws IOException;

  Map<String, Aggregate> findCustomerYearly(String key) throws IOException;

  Map<String, Aggregate> findCustomerMonthly(String key) throws IOException;

  Map<String, Aggregate> findCustomerWeekly(String key) throws IOException;

  Map<String, Aggregate> customerYearlyTotal(String key) throws IOException;

  Map<String, Aggregate> customerMonthlyTotal(String key) throws IOException;

  Map<String, Aggregate> customerWeeklyTotal(String key) throws IOException;

  long weeklyTokenCount(String key) throws IOException;
}

