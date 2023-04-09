package com.example.jungsan.dto.response;

import com.example.jungsan.model.JungsanReport;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class JungsanResponse {
    private List<MemberResponse> members;
    private List<ExpenseResponse> expenseResponses;
    private List<TransferResponse> advanceTransfers;
    private List<TransferResponse> transfers;

    public static JungsanResponse from(JungsanReport report) {

        List<MemberResponse> members = report.getMembers()
                .stream()
                .map(MemberResponse::from)
                .collect(Collectors.toList());

        List<ExpenseResponse> expenses = report.getExpenses()
                .stream()
                .map(ExpenseResponse::from)
                .collect(Collectors.toList());

        List<TransferResponse> advanceTransfers = report.getAdvanceTransfers()
                .stream()
                .map(TransferResponse::from)
                .collect(Collectors.toList());

        List<TransferResponse> transfers = report.getTransfers()
                .stream()
                .map(TransferResponse::from)
                .collect(Collectors.toList());

        return JungsanResponse.builder()
                .members(members)
                .expenseResponses(expenses)
                .advanceTransfers(advanceTransfers)
                .transfers(transfers)
                .build();
    }
}