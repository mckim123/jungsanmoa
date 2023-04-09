package com.example.jungsan.dto.response;

import com.example.jungsan.model.Transfer;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TransferResponse {
    private String from;
    private String to;
    private int amount;

    public static TransferResponse from(Transfer transfer) {
        return TransferResponse.builder()
                .from(transfer.getFrom())
                .to(transfer.getTo())
                .amount(transfer.getAmount())
                .build();
    }
}
