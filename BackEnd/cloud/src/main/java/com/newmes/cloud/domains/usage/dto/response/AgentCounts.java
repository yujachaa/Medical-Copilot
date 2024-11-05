package com.newmes.cloud.domains.usage.dto.response;

import jakarta.persistence.Entity;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Date;
import java.util.List;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

@Data
@Document(indexName = "newmes-cloud-*")
public class AgentCounts {

  @Id
  private String key; // The agent name (MG, CXR, CE)
  private long docCount; // The count of documents for that agent
  private List<UsageData> counts; // List of date buckets

  // Getters and Setters

  public static class UsageData {

    private String keyAsString;
    private long docCount;

    // Date 객체 추가
    private LocalDate date;

    // Getters and Setters

    public String getKeyAsString() {
      return keyAsString;
    }

    public void setKeyAsString(String keyAsString) {
      this.keyAsString = keyAsString;
      this.date = convertStringToDate(keyAsString); // 변환
    }


    public long getDocCount() {
      return docCount;
    }

    public void setDocCount(long docCount) {
      this.docCount = docCount;
    }

    public LocalDate getDate() {
      return date;
    }

    // String을 Date로 변환하는 메서드
    private LocalDate convertStringToDate(String dateString) {
      DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
      try {
        LocalDate date = LocalDate.parse(dateString, formatter);
        return date;
      } catch (DateTimeParseException e) {
        System.out.println("Invalid date format: " + e.getMessage());
      }
      return null;
    }
  }
}
