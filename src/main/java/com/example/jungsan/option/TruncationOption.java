package com.example.jungsan.option;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public enum TruncationOption {
    ONE(1), TEN(10), HUNDRED(100), THOUSAND(1000);

    private int value;
}
