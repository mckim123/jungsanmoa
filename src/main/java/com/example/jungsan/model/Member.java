package com.example.jungsan.model;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class Member {
    private final String name;
    private int totalActualPayment = 0;
    private double totalActualDivision = 0d;
    private int totalAdvancedTransfer = 0;
    private int totalAdvancedReceived = 0;
    private double remaining;
    private int truncatedRemaining;

    public void addActualPayment(int payment) {
        totalActualPayment += payment;
    }

    public void addActualDivision(double division) {
        totalActualDivision += division;
    }

    public void addAdvancedTransfer(int transfer) {
        totalAdvancedTransfer += transfer;
    }

    public void addAdvancedReceived(int received) {
        totalAdvancedReceived += received;
    }

    public double calculateRemaining() {
        remaining = totalActualDivision - totalActualPayment - totalAdvancedTransfer + totalAdvancedReceived;
        return remaining;
    }

    public String getName() {
        return name;
    }

    public void setTruncatedRemaining(int remaining) {
        truncatedRemaining = remaining;
    }
}
