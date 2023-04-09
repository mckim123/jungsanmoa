package com.example.jungsan.service;

import com.example.jungsan.dto.request.JungsanRequest;
import com.example.jungsan.dto.response.JungsanResponse;
import com.example.jungsan.model.JungsanReport;
import com.example.jungsan.model.Members;
import com.example.jungsan.transferplanner.TransferPlanner;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JungsanService {
    private final TransferPlanner transferPlanner;

    public JungsanResponse process(JungsanRequest request) {
        Members members = new Members(request.getMemberNames());
        JungsanReport report = new JungsanReport(members, transferPlanner);
        report.fill(request);
        return JungsanResponse.from(report);
    }
}
