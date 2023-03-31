package com.example.jungsan.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class AdvanceTransfer {

    private final String from;
    private final String to;
    private final int amount;
}
