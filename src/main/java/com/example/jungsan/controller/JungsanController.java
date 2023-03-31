package com.example.jungsan.controller;

import com.example.jungsan.dto.JungsanRequest;
import com.example.jungsan.model.JungsanReport;
import com.example.jungsan.service.JungsanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class JungsanController {
    private final JungsanService jungsanService;

    @GetMapping
    public String index() {
        return "index";
    }

    @PostMapping
    public ResponseEntity<JungsanReport> calculate(@RequestBody JungsanRequest request) {
        JungsanReport report = jungsanService.produceReport(request);
        return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(report);
    }
}
