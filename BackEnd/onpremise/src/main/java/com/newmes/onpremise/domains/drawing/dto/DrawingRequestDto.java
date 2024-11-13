package com.newmes.onpremise.domains.drawing.dto;

import com.newmes.onpremise.domains.drawing.domain.CoordinatesGroup;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DrawingRequestDto {
    private List<CoordinatesGroup> coordinatesGroups;
}
