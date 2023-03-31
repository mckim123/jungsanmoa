package com.example.jungsan.model;

import com.example.jungsan.dto.Expense;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.Getter;

@Getter
public class ExpenseDetail {
    private final List<String> participants;
    private final String payer;
    private final int amount;
    private final Map<String, Double> divisions;

    public ExpenseDetail(Expense expense) {
        this.participants = expense.getParticipants();
        this.payer = expense.getPayer();
        this.amount = expense.getAmount();
        divisions = new HashMap<>();
        calculateDivisions();
    }

    private void calculateDivisions() {
        double result = (double) amount / participants.size();
        Double division = Math.round(result * 1000) / 1000.0;
        participants.forEach(name -> divisions.put(name, division));
    }
}
