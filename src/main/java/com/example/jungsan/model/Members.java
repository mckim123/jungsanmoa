package com.example.jungsan.model;

import com.example.jungsan.dto.AdvanceTransfer;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class Members {
    private final List<Member> members;

    public Members(List<String> memberNames) {
        this.members = memberNames.stream()
                .map(Member::new)
                .collect(Collectors.toList());
        Collections.shuffle(members);
    }

    public void applyExpenseDetail(ExpenseDetail expenseDetail) {
        List<String> participants = expenseDetail.getParticipants();
        Map<String, Double> divisions = expenseDetail.getDivisions();
        for (Member member : members) {
            String name = member.getName();
            if (name == expenseDetail.getPayer()) {
                member.addActualPayment(expenseDetail.getAmount());
            }
            if (participants.contains(name)) {
                member.addActualDivision(divisions.get(name));
            }
        }
    }

    public void applyAdvancedTransfer(AdvanceTransfer advanceTransfer) {
        int amount = advanceTransfer.getAmount();
        for (Member member : members) {
            String name = member.getName();
            if (advanceTransfer.from(name)) {
                member.addAdvancedTransfer(amount);
            }
            if (advanceTransfer.to(name)) {
                member.addAdvancedReceived(amount);
            }
        }
    }

    public List<Double> getRemainings() {
        return members.stream().map(Member::calculateRemaining).collect(Collectors.toList());
    }

    public void applyTruncateRemaining(List<Integer> roundedRemainings) {
        for (int i = 0; i < members.size(); i++) {
            members.get(i).setTruncatedRemaining(roundedRemainings.get(i));
        }
    }
}
