package com.example.jungsan.dto.response;

import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class JungsanResponse {
    private Map<String, Integer> result;
}