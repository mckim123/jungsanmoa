package com.example.jungsan.service;

import com.example.jungsan.dto.JungsanRequest;
import com.example.jungsan.model.JungsanReport;
import com.example.jungsan.model.Members;
import org.springframework.stereotype.Service;

@Service
public class JungsanService {
    public JungsanReport produceReport(JungsanRequest request) {
        Members members = new Members(request.getMembers());
        JungsanReport report = new JungsanReport(members);

        report.fill(request);

        return report;
    }
}
