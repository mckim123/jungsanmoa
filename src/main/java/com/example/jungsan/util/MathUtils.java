package com.example.jungsan.util;

public class MathUtils {
    public static Double roundToThreeDecimalPlaces(double value) {
        return Math.round(value * 1000) / 1000.0;
    }
}
