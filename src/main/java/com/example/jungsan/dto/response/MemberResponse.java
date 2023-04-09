package com.example.jungsan.dto.response;

import com.example.jungsan.model.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberResponse {
    private String name;
    private int totalActualPayment = 0;
    private double totalActualDivision = 0d;
    private double totalAdvancedTransfer = 0d;
    private double totalAdvancedReceived = 0d;
    private double remaining;
    private int roundedRemaining;

    public static MemberResponse from(Member member) {
        return MemberResponse.builder()
                .name(member.getName())
                .totalActualPayment(member.getTotalActualPayment())
                .totalActualDivision(member.getTotalActualDivision())
                .totalAdvancedTransfer(member.getTotalAdvancedTransfer())
                .totalAdvancedReceived(member.getTotalAdvancedReceived())
                .remaining(member.getRemaining())
                .roundedRemaining(member.getRoundedRemaining())
                .build();
    }
}
