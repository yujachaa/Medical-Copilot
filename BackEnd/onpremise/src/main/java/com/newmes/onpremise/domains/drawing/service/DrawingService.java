package com.newmes.onpremise.domains.drawing.service;

import com.newmes.onpremise.domains.drawing.dto.DrawingRequestDto;
import com.newmes.onpremise.domains.drawing.dto.DrawingResponseDto;

import java.util.Optional;

public interface DrawingService {
    DrawingResponseDto saveDrawing(String reportId, DrawingRequestDto requestDto);
    Optional<DrawingResponseDto> getDrawing(String reportId);
}
