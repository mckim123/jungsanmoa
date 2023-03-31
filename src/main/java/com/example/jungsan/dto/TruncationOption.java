package com.example.jungsan.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum TruncationOption {
    ONE(1), TEN(10), HUNDRED(100), THOUSAND(1000);

    private final int value;
}
