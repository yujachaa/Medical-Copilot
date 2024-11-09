package com.newmes.onpremise.domains.history.controller;

import com.newmes.onpremise.domains.history.dto.History;
import com.newmes.onpremise.domains.history.service.HistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/history")
@RequiredArgsConstructor
public class HistoryController {

    private final HistoryService historyService;

    @GetMapping("/member")
    public List<History> getHistoriesByMemberId() {
        return historyService.getHistoryByMemberId();
    }
}
