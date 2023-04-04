package com.example.jungsan.util;

import com.example.jungsan.dto.Expense;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

public class BillSplitter {
    public static Map<String, Double> splitBills(Expense expense) {
        switch (expense.getSplitOption()) {
            case DEFAULT:
                return splitBillsByDefault(expense.getAmount(), expense.getParticipants());
            case DONE:
                return splitBillsAlreadyDone(expense.getAmount(), expense.getParticipants());
            case RATE_CHANGE:
                return splitBillsRateChanged(expense.getAmount(), expense.getParticipants(), expense.getSplitDetails());
            case VALUE_CHANGE:
                return splitBillsValueChanged(expense.getAmount(), expense.getParticipants(),
                        expense.getSplitDetails());
            case SET_DIVISION:
                return splitBillsWithFixedValue(expense.getAmount(), expense.getParticipants(),
                        expense.getSplitDetails());
            case DRINK_SEPARATE:
                return splitBillsWithSeparateDrinks(expense.getAmount(), expense.getParticipants(),
                        expense.getSplitDetails(),
                        expense.getDrinkAmount());
            case TREAT:
                return splitBillsWhenTreated(expense.getAmount(), expense.getPayer());
            default:
                throw new AssertionError();
        }
    }


    public static Map<String, Double> splitBillsByDefault(int amount, List<String> participants) {
        Map<String, Double> divisions = new HashMap<>();
        double result = (double) amount / participants.size();
        Double division = Math.round(result * 1000) / 1000.0;
        participants.forEach(name -> divisions.put(name, division));
        return divisions;
    }

    public static Map<String, Double> splitBillsAlreadyDone(int amount, List<String> participants) {
        Map<String, Double> divisions = new HashMap<>();
        double result = (double) amount / participants.size();
        Double division = Math.round(result * 1000) / 1000.0;
        participants.forEach(name -> divisions.put(name, division));
        return divisions;
    }

    public static Map<String, Double> splitBillsRateChanged(int amount, List<String> participants,
                                                            Map<String, Double> splitDetails) {
        Map<String, Double> divisions = new HashMap<>();
        participants.forEach(name -> splitDetails.putIfAbsent(name, 1d));
        double total = splitDetails.values().stream().reduce(0d, Double::sum);
        if (total == 0) {
            throw new IllegalArgumentException();
        }
        double unit = (double) amount / total;
        for (String participant : participants) {
            Double division = Math.round(splitDetails.get(participant) * 1000 * unit) / 1000.0;
            divisions.put(participant, division);
        }
        return divisions;
    }

    public static Map<String, Double> splitBillsValueChanged(int amount, List<String> participants,
                                                             Map<String, Double> splitDetails) {
        Map<String, Double> divisions = new HashMap<>();
        participants.forEach(name -> splitDetails.putIfAbsent(name, 0d));
        double total = splitDetails.values().stream().reduce(0d, Double::sum);
        double result = (amount + total) / participants.size();
        Double division = Math.round(result * 1000) / 1000.0;
        participants.forEach(name -> divisions.put(name, division + splitDetails.get(name)));
        return divisions;
    }

    public static Map<String, Double> splitBillsWithFixedValue(int amount, List<String> participants,
                                                               Map<String, Double> splitDetails) {
        Map<String, Double> divisions = new HashMap<>(splitDetails);
        double total = splitDetails.values().stream().reduce(0d, Double::sum);

        if (splitDetails.keySet().size() == participants.size()) {
            if (total != amount) {
                throw new IllegalArgumentException();
            }
            return divisions;
        }
        splitDetails.forEach((name, division) -> divisions.put(name, division));

        List<String> lefts = participants.stream().filter(name -> !splitDetails.containsKey(name))
                .collect(Collectors.toList());
        double result = (amount - total) / lefts.size();
        Double division = Math.round(result * 1000) / 1000.0;
        lefts.forEach(name -> divisions.put(name, division));
        return divisions;
    }

    public static Map<String, Double> splitBillsWithSeparateDrinks(int amount, List<String> participants,
                                                                   Map<String, Double> splitDetails, int drinkAmount) {
        Map<String, Double> divisions = new HashMap<>();
        Set<String> drunken = splitDetails.keySet();
        if (drunken.isEmpty()) {
            throw new IllegalArgumentException();
        }
        int withoutDrink = (amount - drinkAmount) / participants.size();
        double withoutDrinkDivision = Math.round(withoutDrink * 1000) / 1000.0;

        int drink = drinkAmount / drunken.size();
        double withDrinkDivision = Math.round((withoutDrink + drink) * 1000) / 1000.0;

        for (String name : participants) {
            if (drunken.contains(name)) {
                divisions.put(name, withDrinkDivision);
            } else {
                divisions.put(name, withoutDrinkDivision);
            }
        }
        return divisions;
    }

    private static Map<String, Double> splitBillsWhenTreated(int amount, String payer) {
        Map<String, Double> divisions = new HashMap<>();
        divisions.put(payer, (double) amount);
        return divisions;
    }
}
