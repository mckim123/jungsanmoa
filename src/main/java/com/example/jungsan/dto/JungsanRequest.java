package com.example.jungsan.dto;

import java.util.List;
import lombok.Getter;

@Getter
public class JungsanRequest {

    private List<String> members;
    private List<Expense> expenses;
    private TruncationOption truncationOption;
    private List<AdvanceTransfer> advanceTransfers;

}
