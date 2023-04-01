package com.example.jungsan.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AdvanceTransfer {

    private String from;
    private String to;
    private int amount;

    public boolean from(String name) {
        return from.equals(name);
    }

    public boolean to(String name) {
        return to.equals(name);
    }
}
