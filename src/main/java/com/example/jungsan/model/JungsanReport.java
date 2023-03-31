package com.example.jungsan.model;

import com.example.jungsan.dto.AdvanceTransfer;
import com.example.jungsan.dto.Expense;
import com.example.jungsan.dto.JungsanRequest;
import com.example.jungsan.dto.TruncationOption;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class JungsanReport {
    private final Members members;
    private final List<ExpenseDetail> expenseDetails = new ArrayList<>();
    private List<AdvanceTransfer> advanceTransfers;

    public void fill(JungsanRequest request) {
        addExpenses(request.getExpenses());
        this.advanceTransfers = request.getAdvanceTransfers();
        applyAdvancedTransfers();
        truncateRemaining(request.getTruncationOption());
        determineTransfers();
    }

    private void addExpenses(List<Expense> expenses) {
        expenses.forEach(this::addExpense);
    }

    private void addExpense(Expense expense) {
        ExpenseDetail expenseDetail = new ExpenseDetail(expense);
        expenseDetails.add(expenseDetail);
        members.applyExpenseDetail(expenseDetail);
    }

    private void applyAdvancedTransfers() {
        advanceTransfers.forEach(members::applyAdvancedTransfer);
    }

    private void truncateRemaining(TruncationOption truncationOption) {
        //TODO
    }

    private void determineTransfers() {
        //TODO
    }
}
