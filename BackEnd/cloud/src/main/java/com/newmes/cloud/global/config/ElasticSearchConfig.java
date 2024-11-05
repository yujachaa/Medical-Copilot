package com.newmes.cloud.global.config;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.json.jackson.JacksonJsonpMapper;
import co.elastic.clients.transport.rest_client.RestClientTransport;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.elasticsearch.client.RestClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.elasticsearch.client.ClientConfiguration;
import org.springframework.data.elasticsearch.client.elc.ElasticsearchClients;
import org.springframework.data.elasticsearch.client.elc.ElasticsearchConfiguration;
import org.springframework.data.elasticsearch.client.elc.ElasticsearchTemplate;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;

@Configuration
@EnableElasticsearchRepositories
public class ElasticSearchConfig extends ElasticsearchConfiguration {

  @Value("${spring.elasticsearch.url}")
  String url;

  @Value("${spring.elasticsearch.username}")
  private String username;

  @Value("${spring.elasticsearch.password}")
  private String password;

  @Override
  public ClientConfiguration clientConfiguration() {
    return ClientConfiguration.builder()
        .connectedTo(url)
        .withBasicAuth(username, password)
        .build();
  }
//
//  @Bean
//  public ElasticsearchClient elasticsearchClient(RestClient restClient) {
//    ObjectMapper objectMapper = new ObjectMapper();
//    objectMapper.registerModule(new JavaTimeModule());
//
//    JacksonJsonpMapper jsonpMapper = new JacksonJsonpMapper(objectMapper);
//    RestClientTransport transport = new RestClientTransport(restClient, jsonpMapper);
//
//    return new ElasticsearchClient(transport);
//  }
//
//  @Bean(name = "{elasticsearchOperations, elasticsearchTemplate}")
//  public ElasticsearchOperations elasticsearchTemplate(ElasticsearchClient elasticsearchClient) {
//    return new ElasticsearchOperations(elasticsearchClient);
//  }


}