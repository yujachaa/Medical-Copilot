package com.newmes.onpremise.domains.drawing.entity;

import com.newmes.onpremise.domains.drawing.domain.CoordinatesGroup;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(indexName = "drawing")
public class DrawingEntity {
    @Id
    private String reportId;
    private List<CoordinatesGroup> coordinatesGroups;
}

