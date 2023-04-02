package com.example.jungsan.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class JungsanRequest {

    private List<String> members;
    private List<Expense> expenses;
    private TruncationOption truncationOption;
    private List<AdvanceTransfer> advanceTransfers;

}
