package com.example.jungsan.model;

import java.util.List;
import java.util.stream.Collectors;

public class Members {
    private final List<Member> members;

    public Members(List<String> memberNames) {
        this.members = memberNames.stream()
                .map(Member::new)
                .collect(Collectors.toList());
    }
}
