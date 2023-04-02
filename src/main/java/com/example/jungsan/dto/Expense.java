package com.example.jungsan.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Expense {

    private String payer;
    private List<String> participants;
    private int amount;
    private String description;
    
}
