package com.example.jungsan.dto;

import java.util.List;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class ExpenseDetail {

    private final String payer;
    private final List<String> participants;
    private final int amount;
}
