package com.newmes.onpremise.global.config;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.json.jackson.JacksonJsonpMapper;
import co.elastic.clients.transport.rest_client.RestClientTransport;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.apache.http.HttpHost;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.elasticsearch.client.RestClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.elasticsearch.client.ClientConfiguration;
import org.springframework.data.elasticsearch.client.elc.ElasticsearchConfiguration;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;

@Configuration
@EnableElasticsearchRepositories
public class ElasticSearchConfig extends ElasticsearchConfiguration {

  @Value("${spring.elasticsearch.url}")
  String url;

  @Value("${spring.elasticsearch.username}")
  private String username;

  @Value("${spring.elasticsearch.password}")
  private String password;

//  @Bean
//  public ObjectMapper objectMapper() {
//    ObjectMapper mapper = new ObjectMapper();
//    mapper.registerModule(new JavaTimeModule());
//    mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
//    return mapper;
//  }
//
//  @Bean
//  public JacksonJsonpMapper jacksonJsonpMapper(ObjectMapper objectMapper) {
//    return new JacksonJsonpMapper(objectMapper);
//  }
//
//  @Bean
//  public RestClient restClient(@Value("${spring.elasticsearch.username}") String username,
//                               @Value("${spring.elasticsearch.password}") String password,
//                               @Value("${spring.elasticsearch.uris}") String url) {
//    CredentialsProvider credentialsProvider = new BasicCredentialsProvider();
//    credentialsProvider.setCredentials(AuthScope.ANY, new UsernamePasswordCredentials(username, password));
//
//    return RestClient.builder(
//                    new HttpHost(url, 9200)
//            )
//            .setHttpClientConfigCallback(httpClientBuilder ->
//                    httpClientBuilder.setDefaultCredentialsProvider(credentialsProvider))
//            .build();
//  }
//
//  @Bean
//  public ElasticsearchClient elasticsearchClient(RestClient restClient, JacksonJsonpMapper jacksonJsonpMapper) {
//    RestClientTransport transport = new RestClientTransport(restClient, jacksonJsonpMapper);
//    return new ElasticsearchClient(transport);
//  }

  @Override
  public ClientConfiguration clientConfiguration() {
    return ClientConfiguration.builder()
        .connectedTo(url)
        .withBasicAuth(username, password)
        .build();
  }
}
