package com.example.jungsan.model;

import com.example.jungsan.option.SplitOption;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.Getter;

@Getter
public class Members {
    private final List<Member> members;

    public Members(List<String> memberNames) {
        this.members = memberNames.stream()
                .map(Member::new)
                .collect(Collectors.toList());
        Collections.shuffle(members);
    }

    public void applyExpenseDetail(Expense expense) {
        expense.splitBills();
        Map<String, Double> divisions = expense.getDivisions();
        //        Map<String, Double> divisions = expense.getDivisions();
        //        for (Member member : members) {
        //            String name = member.getName();
        //            if (divisions.containsKey(name)) {
        //                member.addExpense(expense.getPayer(), divisions.get(name));
        //            }
        //        }

        List<String> participants = expense.getParticipants();
        for (Member member : members) {
            String name = member.getName();
            if (expense.getPayer().equals(name)) {
                member.addActualPayment(expense.getAmount());
                if (SplitOption.DONE.equals(expense.getSplitOption())) {
                    member.addAdvancedReceived(divisions.get(name) * (divisions.size() - 1));
                }
                if (SplitOption.TREAT.equals(expense.getSplitOption())) {
                    member.addActualDivision(expense.getAmount());
                }
            }
            if (participants.contains(name) && !SplitOption.TREAT.equals(expense.getSplitOption())) {
                member.addActualDivision(divisions.get(name));
                if (SplitOption.DONE.equals(expense.getSplitOption()) && !expense.getPayer().equals(name)) {
                    member.addAdvancedTransfer(divisions.get(name));
                }
            }
        }
    }

    public void applyAdvancedTransfer(Transfer advanceTransfer) {
        int amount = advanceTransfer.getAmount();
        for (Member member : members) {
            String name = member.getName();
            if (advanceTransfer.isFrom(name)) {
                member.addAdvancedTransfer(amount);
            }
            if (advanceTransfer.isTo(name)) {
                member.addAdvancedReceived(amount);
            }
        }
    }

    public List<Double> getRemainings() {
        return members.stream().map(Member::calculateRemaining).collect(Collectors.toList());
    }

    public void applyRoundedRemaining(List<Integer> roundedRemainings) {
        for (int i = 0; i < members.size(); i++) {
            members.get(i).setRoundedRemaining(roundedRemainings.get(i));
        }
    }

    public Map<String, Integer> getRoundedRemainings() {
        Map<String, Integer> roundedRemainings = new HashMap<>();
        for (int i = 0; i < members.size(); i++) {
            Member member = members.get(i);
            int roundedRemaining = member.getRoundedRemaining();
            if (roundedRemaining != 0) {
                roundedRemainings.put(member.getName(), roundedRemaining);
            }
        }
        return roundedRemainings;
    }

    public void sort() {
        members.sort(Comparator.comparing(Member::getName));
    }
}
