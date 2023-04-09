package com.example.jungsan.model;

import com.example.jungsan.dto.request.ExpenseRequest;
import com.example.jungsan.option.SplitOption;
import com.example.jungsan.util.BillSplitter;
import java.util.List;
import java.util.Map;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class Expense {
    private final List<String> participants;
    private final String payer;
    private final String description;
    private final int amount;
    private Map<String, Double> divisions;
    private final SplitOption splitOption;
    private final Map<String, Double> splitDetails;
    private int drinkAmount;

    public Expense(ExpenseRequest expenseRequest) {
        this.participants = expenseRequest.getParticipants();
        this.payer = expenseRequest.getPayer();
        this.amount = expenseRequest.getAmount();
        this.description = expenseRequest.getDescription();
        this.splitOption = expenseRequest.getSplitOption();
        this.splitDetails = expenseRequest.getSplitDetails();
        this.drinkAmount = expenseRequest.getDrinkAmount();
    }

    public void splitBills() {
        divisions = BillSplitter.splitBills(this);
    }
}
