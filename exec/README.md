
<div align="center">
<h1>의료진을 위한 AI 병증진단분석 서비스</h1>
<h3> Medical-Copilot </h3>
![logo.png](/FrontEnd/public/Logo_Landing.png)
</div>

## 기술 스택, 빌드 버전 및 기타 도구

### onpremise server
![image1.png](/exec/onpremise.png)

### cloud server
![image2.png](/exec/cloud.png)

### ai server
![image3.png](/exec/ai.png)

### Frontend
- 언어 : Javascript
- 라이브러리 : React (v5.0.1)
- Next.js (v14.2.16)
- node (v20.18.0)
- CSS : styled components

### Backend
- JVM : Java(17)
- 프레임 워크 : Spring boot (v3.3.5)
  - gradle : 8.10
- 데이터 베이스 : PostgreSQL (v8), Redis (v7.4)
- 보안 : Spring-Security, JWT
- Elasticsearch(v8.13.4)
- Kibana(v8.13.4)
- Logstash(8.13.4)

### AI
- python: 3.13

### Infra
- 서버 : AWS EC2 ubuntu 20.04.6 LTS
- CI/CD 도구 : Gitlab, Jenkins (v2.452.3), Docker (v27.3.1), Docker-compose (v1.29.7)
- Nginx (v1.27.2-alpine)
- certbot (arm64v8-v2.11.0)

### 기타 도구
- 개발 도구 : VsCode (v1.90.2), IntelliJ (v2024.1.4)
- 일정 관리 : Jira, Notion
- 커뮤니케이션 : MatterMost
- 디자인 : Figma

## 빌드 

### 1. nginx, certbot, jenkins

- docker-compose.yml
```shell
services: 
  nginx:
    container_name: nginx
    image: nginx:1.27.2-alpine # base image
    restart: unless-stopped
    volumes:
      - ./nginx/default.conf:/etc/nginx/conf.d/default.conf
      - ./certbot/conf:/etc/letsencrypt
      - ./certbot/www:/var/www/certbot
    ports:
      - "80:80"
      - "443:443"
    command: "/bin/sh -c 'while :; do sleep 6h & wait $${!}; nginx -s reload; done & nginx -g \"daemon off;\"'"

  certbot:
    container_name: certbot
    image: certbot/certbot:arm64v8-v2.11.0
    restart: unless-stopped
    volumes:
      - ./certbot/conf:/etc/letsencrypt
      - ./certbot/www:/var/www/certbot
    entrypoint: "/bin/sh -c 'trap exit TERM; while :; do certbot renew; sleep 12h & wait $${!}; done;'"

  jenkins:
    container_name: jenkins
    image: jenkins/jenkins:jdk17
    restart: unless-stopped
    volumes: 
      - ./jenkins:/var/jenkins_home
      - /var/run/docker.sock:/var/run/docker.sock
    ports:
      - "50000:50000"
      - "8081:8081"
    environment:
      - JENKINS_OPTS="--prefix=/jenkins"
    command: "--httpPort=8081"  # 기본 포트를 8081로 설정
    
```

### 2. kafka, postgresql, redis, elk

- docker-compose.yml
```shell
services:
  elasticsearch_cloud:
    container_name: elasticsearch_cloud
    image: elasticsearch:8.15.3 # base image
    restart: unless-stopped
    volumes:
      - ./elasticsearch/data:/usr/share/elasticsearch/data
      - ./elasticsearch/config:/usr/share/elasticsearch/config
    ports:
      - "9201:9201"
    deploy:
      resources:
        limits:
          memory: 1GB
    environment:
      - discovery.type=single-node # 단일 노드 모드 설정
      - xpack.security.enabled= false
      - ES_JAVA_OPTS=-Xms512m -Xmx512m
    networks:
      - db

 kibana_cloud:
    container_name: kibana_cloud
    image: kibana:8.15.3
    restart: unless-stopped
    volumes:
      - ./kibana/data:/usr/share/kibana/data
      - ./kibana/config:/usr/share/kibana/config
    ports:
      - "5602:5602"
    environment:
      - SERVER_BASEPATH=/cloud/kibana
      - SERVER_REWRITEBASEPATH=true
      - ELASTICSEARCH_HOSTS=http://elasticsearch_cloud:9201 # Elasticsearch와 연결
    networks:
      - db
      
	logstash:
    container_name: logstash
    image: logstash:8.15.3
    restart: unless-stopped
    volumes:
      - ./logstash/data:/usr/share/logstash/data
      - ./logstash/config:/usr/share/logstash/config
    ports: "5000:5000"
    networks:
      - db


  redis:
    container_name: redis
    image: redis:latest
    restart: unless-stopped
    ports:
      - "6379:6379"
    volumes:
      - ./redis/data:/data
      - ./redis/conf/redis.conf:/usr/local/etc/redis/redis.conf
    command: redis-server /usr/local/etc/redis/redis.conf
    networks:
      - db

  postgres:
    container_name: postgres
    image: postgres:17.0-alpine3.20
    restart: unless-stopped
    volumes:
      - ./postgres/postgres-data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: newmes
      POSTGRES_PASSWORD: newmes^^
      POSTGRES_DB: newmes
    networks:
      - db
networks:
  db:
    driver: bridge
```

### 3. Nginx

**Nginx 설정**

a. default.conf
파일 위치는 컨테이너 내부 기준 /etc/nginx/conf.d/default.conf \
onpremise\
[default.conf](/exec/default.conf)\
cloud\
[default2.conf](/exec/default2.conf)

### 부록 - Frontend,Backend Dockerfile, jenkinsfile

1. Frontend-onpremise Dockerfile \
[Frontend Dockerfile](/FrontEnd/dockerfile)
2. Frontend Jenkinsfile \
[Frontend-onpremise Jenkinsfile](/FrontEnd/jenkinsfile)
3. Backend-onpremise Dockerfile \
[Backend Dockerfile](/BackEnd/onpremise/dockerfile)
4. Backend-onpremise Jenkinsfile \
[Backend Jenkinsfile](/BackEnd/onpremise/jenkinsfile)
1. Frontend-cloud Dockerfile \
[Frontend Dockerfile](/FrontEnd-Cloud/dockerfile)
2. Frontend-cloud Jenkinsfile \
[Frontend Jenkinsfile](/FrontEnd-Cloud/jenkinsfile)
3. Backend-cloud Dockerfile \
[Backend Dockerfile](/BackEnd/cloud/dockerfile)
4. Backend-cloud Jenkinsfile \
[Backend Jenkinsfile](/BackEnd/cloud/jenkinsfile)

## 환경변수 설정

### 1. Frontend
a. frontend 설정파일 \
경로: /FrontEnd/.env
``` yaml
NEXT_PUBLIC_SERVER_URL=
```
### 2. Backend
a. backend onpremise 설정파일 폴더 \
경로: /BackEnd/onpremise/.env
``` yaml
server.port=
spring.application.name=
jwt.secret=
jwt.expiration_time=
jwt.refresh_expiration_time=
jwt.refresh_secret=

spring.data.redis.host=
spring.data.redis.port=
spring.data.redis.timeout=
spring.data.redis.password=
#logging.level.org.springframework.kafka=DEBUG
spring.kafka.consumer.group-id=
spring.kafka.consumer.auto-offset-reset=
spring.kafka.consumer.key-deserializer=
spring.kafka.consumer.value-deserializer=
spring.kafka.consumer.properties.spring.deserializer.value.delegate.class=
spring.kafka.consumer.properties.spring.json.trusted.packages=
spring.kafka.consumer.properties.spring.json.value.default.type=
spring.kafka.bootstrap-servers=

spring.kafka.producer.key-serializer=
spring.kafka.producer.value-serializer=
spring.kafka.producer.properties.spring.json.add.type.headers=
# spring.elasticsearch.uris=https://k11s205.p.ssafy.io/cloud/elasticsearch
spring.elasticsearch.uris=
spring.elasticsearch.url=
spring.elasticsearch.username=
spring.elasticsearch.password=
spring.elasticsearch.restclient.ssl.verification-mode=

spring.jpa.open-in-view=
external.server.url=

spring.datasource.url=
spring.datasource.username=
spring.datasource.password=
spring.datasource.driver-class-name=
spring.jpa.database-platform=
spring.jpa.hibernate.ddl-auto=
spring.jpa.show-sql=

```
b. backend cloud 설정파일 폴더 \
경로: /BackEnd/cloud/.env
``` yaml
spring.application.name=
jwt.secret=
jwt.expiration_time=
jwt.refresh_expiration_time=
jwt.refresh_secret=

spring.datasource.url=
spring.datasource.username=
spring.datasource.password=
spring.datasource.driver-class-name=

logging.level.org.springframework.security=

spring.jpa.database-platform=
spring.jpa.hibernate.ddl-auto=
spring.jpa.show-sql=

server.servlet.session.timeout=
server.servlet.session.cookie.same-site=
server.servlet.session.cookie.secure=

spring.elasticsearch.uris=
spring.elasticsearch.url=
spring.elasticsearch.username=
spring.elasticsearch.password=
spring.data.elasticsearch.restclient.ssl.verification-mode=
```


