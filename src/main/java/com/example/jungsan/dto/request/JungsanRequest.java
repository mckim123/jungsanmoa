package com.example.jungsan.dto.request;

import com.example.jungsan.model.Transfer;
import com.example.jungsan.option.TruncationOption;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class JungsanRequest {

    @JsonProperty("members")
    @NonNull
    private List<String> memberNames;
    @NonNull
    private List<ExpenseRequest> expenses;
    private List<Transfer> advanceTransfers;
    @NonNull
    private TruncationOption truncationOption;

}
