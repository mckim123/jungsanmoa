package com.example.jungsan.model;

import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class Transfer {

    @NonNull
    private final String from;
    @NonNull
    private final String to;
    private final int amount;

    public boolean isFrom(String name) {
        return from.equals(name);
    }

    public boolean isTo(String name) {
        return to.equals(name);
    }
}
