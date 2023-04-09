package com.example.jungsan.dto.response;

import com.example.jungsan.model.Expense;
import com.example.jungsan.option.SplitOption;
import java.util.List;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExpenseResponse {
    private List<String> participants;
    private String payer;
    private String description;
    private int amount;
    private Map<String, Double> divisions;
    private SplitOption splitOption;
    private Map<String, Double> splitDetails;
    private int drinkAmount;

    public static ExpenseResponse from(Expense expense) {
        return ExpenseResponse.builder()
                .participants(expense.getParticipants())
                .payer(expense.getPayer())
                .description(expense.getDescription())
                .amount(expense.getAmount())
                .divisions(expense.getDivisions())
                .splitOption(expense.getSplitOption())
                .splitDetails(expense.getSplitDetails())
                .drinkAmount(expense.getDrinkAmount())
                .build();
    }
}
