package com.example.jungsan.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class AdvanceTransfer {

    private final String from;
    private final String to;
    private final int amount;

    public boolean from(String name) {
        return from.equals(name);
    }

    public boolean to(String name) {
        return to.equals(name);
    }
}
