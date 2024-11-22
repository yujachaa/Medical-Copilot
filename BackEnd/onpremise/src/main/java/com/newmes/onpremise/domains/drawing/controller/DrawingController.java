package com.newmes.onpremise.domains.drawing.controller;

import com.newmes.onpremise.domains.drawing.dto.DrawingRequestDto;
import com.newmes.onpremise.domains.drawing.dto.DrawingResponseDto;
import com.newmes.onpremise.domains.drawing.service.DrawingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/drawing")
@RequiredArgsConstructor
public class DrawingController {

    private final DrawingService drawingService;

    @PostMapping("/{reportId}")
    public ResponseEntity<DrawingResponseDto> saveDrawing(
            @PathVariable String reportId,
            @RequestBody DrawingRequestDto requestDto) {
        DrawingResponseDto responseDto = drawingService.saveDrawing(reportId, requestDto);
        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/{reportId}")
    public ResponseEntity<DrawingResponseDto> getDrawing(@PathVariable String reportId) {
        return drawingService.getDrawing(reportId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
