package com.example.jungsan.dto;

import java.util.List;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class Expense {

    private final String payer;
    private final List<String> participants;
    private final int amount;
}
