package com.example.jungsan.util;

public class MathUtils {
    public static Double roundToThreeDecimalPlaces(double value) {
        return Math.round(value * 1000) / 1000.0;
    }

    public static Double roundToTwoDecimalPlaces(double value) {
        return Math.round(value * 100) / 100.0;
    }
}
