package com.example.jungsan.service;

import com.example.jungsan.dto.JungsanRequest;
import com.example.jungsan.model.JungsanReport;
import com.example.jungsan.model.Members;
import com.example.jungsan.transferplanner.TransferPlanner;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JungsanService {
    private final TransferPlanner transferPlanner;

    public JungsanReport produceReport(JungsanRequest request) {
        Members members = new Members(request.getMembers());
        JungsanReport report = new JungsanReport(members, transferPlanner);
        report.fill(request);
        return report;
    }
}
