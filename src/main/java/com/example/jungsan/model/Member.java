package com.example.jungsan.model;

import static com.example.jungsan.util.MathUtils.roundToTwoDecimalPlaces;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class Member {
    private final String name;
    private int totalActualPayment = 0;
    private double totalActualDivision = 0d;
    private double totalAdvancedTransfer = 0d;
    private double totalAdvancedReceived = 0d;
    private double remaining;
    private int roundedRemaining;

    public void addActualPayment(int payment) {
        totalActualPayment += payment;
    }

    public void addActualDivision(double division) {
        totalActualDivision += division;
    }

    public void addAdvancedTransfer(double transfer) {
        totalAdvancedTransfer += transfer;
    }

    public void addAdvancedReceived(double received) {
        totalAdvancedReceived += received;
    }

    public double calculateRemaining() {
        remaining = totalActualDivision - totalActualPayment - totalAdvancedTransfer + totalAdvancedReceived;
        remaining = roundToTwoDecimalPlaces(remaining);
        return remaining;
    }

    public String getName() {
        return name;
    }

    public void setRoundedRemaining(int remaining) {
        roundedRemaining = remaining;
    }
}
