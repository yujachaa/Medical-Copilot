package com.newmes.onpremise.domains.drawing.service;

import com.newmes.onpremise.domains.drawing.dto.DrawingRequestDto;
import com.newmes.onpremise.domains.drawing.dto.DrawingResponseDto;
import com.newmes.onpremise.domains.drawing.entity.DrawingEntity;
import com.newmes.onpremise.domains.drawing.repository.DrawingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DrawingServiceImpl implements DrawingService {

    private final DrawingRepository drawingRepository;

    @Override
    public DrawingResponseDto saveDrawing(String reportId, DrawingRequestDto requestDto) {
        DrawingEntity entity = DrawingEntity.builder()
                .reportId(reportId)
                .coordinatesGroups(requestDto.getCoordinatesGroups())
                .build();
        DrawingEntity savedEntity = drawingRepository.save(entity);
        return DrawingResponseDto.builder()
                .reportId(savedEntity.getReportId())
                .coordinatesGroups(savedEntity.getCoordinatesGroups())
                .build();
    }

    @Override
    public Optional<DrawingResponseDto> getDrawing(String reportId) {
        return drawingRepository.findById(reportId)
                .map(entity -> DrawingResponseDto.builder()
                        .reportId(entity.getReportId())
                        .coordinatesGroups(entity.getCoordinatesGroups())
                        .build());
    }
}
