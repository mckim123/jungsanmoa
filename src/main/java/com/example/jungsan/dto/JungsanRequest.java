package com.example.jungsan.dto;

import java.util.List;
import lombok.Getter;

@Getter
public class JungsanRequest {

    private List<String> members;
    private List<ExpenseDetail> expenseDetails;
    private TruncationOption truncationOption;
    private AdvancePayment advancePayment;

}
