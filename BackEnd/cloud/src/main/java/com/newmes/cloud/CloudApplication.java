package com.newmes.cloud;

import com.newmes.cloud.domains.usage.repositoryES.CustomRepository;
import com.newmes.cloud.domains.usage.repositoryES.CustomRepositoryImpl;
//import com.newmes.cloud.domains.usage.repositoryES.ElasticUsageRepository;
import com.newmes.cloud.global.config.ElasticSearchConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
//@EnableJpaRepositories(excludeFilters = @ComponentScan.Filter(
//		type = FilterType.ASSIGNABLE_TYPE,
//		classes = ElasticUsageRepository.class))
public class CloudApplication {

	public static void main(String[] args) {
		SpringApplication.run(CloudApplication.class, args);
	}

}
