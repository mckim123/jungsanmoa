package com.example.jungsan.model;

import com.example.jungsan.dto.request.ExpenseRequest;
import com.example.jungsan.dto.request.JungsanRequest;
import com.example.jungsan.option.TruncationOption;
import com.example.jungsan.transferplanner.TransferPlanner;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class JungsanReport {
    private final Members members;
    private final List<Expense> expenses = new ArrayList<>();
    private List<Transfer> advanceTransfers;
    private List<Transfer> transfers;

    @JsonIgnore
    private final TransferPlanner transferPlanner;

    public void fill(JungsanRequest request) {
        addExpenses(request.getExpenses());
        advanceTransfers = request.getAdvanceTransfers();
        applyAdvancedTransfers();
        roundRemainings(request.getTruncationOption());
        determineTransfers();
        members.sort();
    }

    private void addExpenses(List<ExpenseRequest> expenseRequests) {
        expenseRequests.forEach(this::addExpense);
    }

    private void addExpense(ExpenseRequest expenseRequest) {
        Expense expense = new Expense(expenseRequest);
        expense.splitBills();
        expenses.add(expense);
        members.applyExpenseDetail(expense);
    }

    private void applyAdvancedTransfers() {
        if (Objects.nonNull(advanceTransfers)) {
            advanceTransfers.forEach(members::applyAdvancedTransfer);
        }
    }

    private void roundRemainings(TruncationOption truncationOption) {
        int roundingUnit = truncationOption.getValue();
        List<Double> remainings = members.getRemainings();
        List<Integer> roundedRemainings = new ArrayList<>();
        List<Double> increasedValues = new ArrayList<>();

        for (Double remaining : remainings) {
            int rounded = (int) Math.ceil(remaining / roundingUnit) * roundingUnit;
            double increased = rounded - remaining;
            roundedRemainings.add(rounded);
            increasedValues.add(increased);
        }

        int DecreasingCount = roundedRemainings.stream().mapToInt(Integer::intValue).sum() / roundingUnit;
        Set<Integer> decreasingIndices = determineDecreasingIndices(increasedValues, DecreasingCount);
        decreasingIndices.stream().forEach(i -> {
            roundedRemainings.set(i, roundedRemainings.get(i) - roundingUnit);
            increasedValues.set(i, increasedValues.get(i) - roundingUnit);
        });

        members.applyRoundedRemaining(roundedRemainings);
    }

    private Set<Integer> determineDecreasingIndices(List<Double> increasedValues, int count) {
        Set<Integer> decreasingIndices = new HashSet<>();
        List<Double> copiedList = new ArrayList<>(increasedValues); // index 계산 용도
        List<Double> sortedList = new ArrayList<>(increasedValues);
        sortedList.sort(Collections.reverseOrder());
        for (int i = 0; i < count; i++) {
            double nextValue = sortedList.get(i);
            int nextIndex = copiedList.indexOf(nextValue);
            decreasingIndices.add(nextIndex);
            copiedList.set(nextIndex, -1d);
        }
        return decreasingIndices;
    }

    private void determineTransfers() {
        transfers = transferPlanner.plan(members.getRoundedRemainings());
    }

    public List<Member> getMembers() {
        return members.getMembers();
    }
}
