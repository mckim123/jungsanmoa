package com.example.jungsan.dto.request;

import com.example.jungsan.option.SplitOption;
import java.util.List;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ExpenseRequest {

    @NonNull
    private String payer;
    private String description;
    private int amount;
    @NonNull
    private SplitOption splitOption;
    private Map<String, Double> splitDetails;
    @NonNull
    private List<String> participants;
    private int drinkAmount;

}
