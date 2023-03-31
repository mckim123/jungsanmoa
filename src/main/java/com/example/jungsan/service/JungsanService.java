package com.example.jungsan.service;

import com.example.jungsan.dto.JungsanRequest;
import com.example.jungsan.model.JungsanReport;
import com.example.jungsan.model.Member;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
public class JungsanService {
    public JungsanReport produceReport(JungsanRequest request) {
        List<Member> members = request.getMembers()
                .stream()
                .map(Member::new)
                .collect(Collectors.toList());
        JungsanReport report = new JungsanReport(members);

        // Todo : report 내용 추가

        return report;
    }
}
