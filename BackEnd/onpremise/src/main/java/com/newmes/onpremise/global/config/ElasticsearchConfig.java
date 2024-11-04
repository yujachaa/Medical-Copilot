package com.newmes.onpremise.global.config;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.json.jackson.JacksonJsonpMapper;
import co.elastic.clients.transport.rest_client.RestClientTransport;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.apache.http.HttpHost;
import org.apache.http.message.BasicHeader;
import org.apache.http.HttpHeaders;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ElasticsearchConfig {

    @Bean
    public RestClient restClient(
            @Value("${spring.elasticsearch.uris}") String url,
            @Value("${spring.elasticsearch.apiKey}") String apiKey) {

        RestClientBuilder builder = RestClient.builder(HttpHost.create(url))
                .setDefaultHeaders(new BasicHeader[]{new BasicHeader(HttpHeaders.AUTHORIZATION, "ApiKey " + apiKey)});

        return builder.build();
    }

    @Bean
    public ElasticsearchClient elasticsearchClient(RestClient restClient) {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());

        JacksonJsonpMapper jsonpMapper = new JacksonJsonpMapper(objectMapper);
        RestClientTransport transport = new RestClientTransport(restClient, jsonpMapper);

        return new ElasticsearchClient(transport);
    }
}
