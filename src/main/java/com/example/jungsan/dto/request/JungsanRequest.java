package com.example.jungsan.dto.request;

import com.example.jungsan.dto.Transfer;
import com.example.jungsan.dto.TruncationOption;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class JungsanRequest {

    @NonNull
    private List<String> memberNames;
    @NonNull
    private List<ExpenseRequest> expenses;
    @NonNull
    private List<Transfer> advanceTransfers;
    @NonNull
    private TruncationOption truncationOption;

}
