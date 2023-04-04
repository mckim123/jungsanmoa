package com.example.jungsan.model;

import com.example.jungsan.dto.Expense;
import com.example.jungsan.dto.SplitOption;
import com.example.jungsan.util.BillSplitter;
import java.util.List;
import java.util.Map;
import lombok.Getter;

@Getter
public class ExpenseDetail {
    private final List<String> participants;
    private final String payer;
    private final String description;
    private final int amount;
    private final Map<String, Double> divisions;
    private final SplitOption splitOption;
    private final Map<String, Double> splitDetails;
    private int drinkAmount;

    public ExpenseDetail(Expense expense) {
        this.participants = expense.getParticipants();
        this.payer = expense.getPayer();
        this.amount = expense.getAmount();
        this.description = expense.getDescription();
        this.splitOption = expense.getSplitOption();
        this.splitDetails = expense.getSplitDetails();
        this.drinkAmount = expense.getDrinkAmount();
        divisions = BillSplitter.splitBills(expense);
    }
}
