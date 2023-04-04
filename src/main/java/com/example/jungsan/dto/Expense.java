package com.example.jungsan.dto;

import java.util.List;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Expense {

    private String payer;
    private List<String> participants;
    private int amount;
    private String description;
    private SplitOption splitOption;
    private Map<String, Double> splitDetails;
    private int drinkAmount;

}
