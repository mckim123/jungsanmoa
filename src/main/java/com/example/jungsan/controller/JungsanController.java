package com.example.jungsan.controller;

import com.example.jungsan.dto.request.JungsanRequest;
import com.example.jungsan.dto.response.JungsanResponse;
import com.example.jungsan.service.JungsanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class JungsanController {
    private final JungsanService jungsanService;

    @GetMapping
    public String index() {
        return "index.html";
    }

    @PostMapping
    @ResponseBody
    public ResponseEntity<JungsanResponse> calculate(@RequestBody JungsanRequest request) {
        JungsanResponse report = jungsanService.process(request);
        return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(report);
    }
}
