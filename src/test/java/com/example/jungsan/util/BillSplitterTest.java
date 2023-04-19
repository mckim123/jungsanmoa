package com.example.jungsan.util;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;

import com.example.jungsan.dto.request.ExpenseRequest;
import com.example.jungsan.model.Expense;
import com.example.jungsan.option.SplitOption;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

class BillSplitterTest {
    int amount;
    List<String> participants;
    Map<String, Double> divisions;
    Map<String, Double> defaultResult;

    @BeforeEach
    void setUp() {
        amount = 100000;
        participants = List.of("A", "B", "C", "D", "E", "F");
        defaultResult = new HashMap<>();
        defaultResult.put("A", 16666.667);
        defaultResult.put("B", 16666.667);
        defaultResult.put("C", 16666.667);
        defaultResult.put("D", 16666.667);
        defaultResult.put("E", 16666.667);
        defaultResult.put("F", 16666.667);
    }

    @Test
    @DisplayName("분담 인원이 0명 이하이거나, 분담 금액이 0원 미만인 경우 예외를 던진다.")
    void splitBillsFailTest() {
        ExpenseRequest request1 = new ExpenseRequest("A", null, 10000, SplitOption.DEFAULT, null, new ArrayList<>(), 0);
        ExpenseRequest request2 = new ExpenseRequest("A", null, -10000, SplitOption.DEFAULT, null, participants, 0);

        Expense expense1 = new Expense(request1);
        Expense expense2 = new Expense(request2);

        assertThatThrownBy(() -> BillSplitter.splitBills(expense1))
                .isInstanceOf(IllegalArgumentException.class);

        assertThatThrownBy(() -> BillSplitter.splitBills(expense2))
                .isInstanceOf(IllegalArgumentException.class);
    }

    @Test
    @DisplayName("DEFAULT 방식일 때 분담 금액을 정확히 나눈다")
    void splitBillsByDefaultTest() {
        divisions = BillSplitter.splitBillsByDefault(amount, participants);
        assertThat(divisions).isEqualTo(defaultResult);
    }

    @Test
    @DisplayName("DONE 방식일 때 분담 금액을 정확히 나눈다.")
    void splitBillsAlreadyDoneTest() {
        divisions = BillSplitter.splitBillsAlreadyDone(amount, participants);
        assertThat(divisions).isEqualTo(defaultResult);
    }

    @Test
    @DisplayName("RATE CHANGE 방식일 때 분담 금액을 정확히 나눈다.")
    void splitBillsRateChanged() {
        Map<String, Double> splitDetails1 = new HashMap<>();
        divisions = BillSplitter.splitBillsRateChanged(amount, participants, splitDetails1);
        assertThat(divisions).isEqualTo(defaultResult);

        Map<String, Double> splitDetails2 = new HashMap<>();
        //2, 0.5, 1, 1, 1, 1
        splitDetails2.put("A", 2.0);
        splitDetails2.put("B", 0.5);
        splitDetails2.put("C", 1.0);

        Map<String, Double> expectedResult2 = new HashMap<>();
        expectedResult2.put("A", 30769.231);
        expectedResult2.put("B", 7692.308);
        expectedResult2.put("C", 15384.615);
        expectedResult2.put("D", 15384.615);
        expectedResult2.put("E", 15384.615);
        expectedResult2.put("F", 15384.615);

        divisions = BillSplitter.splitBillsRateChanged(amount, participants, splitDetails2);
        assertThat(divisions).isEqualTo(expectedResult2);
    }

    @Test
    @DisplayName("RATE CHANGE 방식일 때 음수의 비율을 지정할 수 없다.")
    void splitBillsRateChangedFailTest() {
        Map<String, Double> splitDetails = new HashMap<>();
        splitDetails.put("A", -1.0);
        splitDetails.put("B", 1.0);

        assertThatThrownBy(() -> BillSplitter.splitBillsRateChanged(amount, participants, splitDetails))
                .isInstanceOf(IllegalArgumentException.class);
    }

    @Test
    @DisplayName("VALUE CHANGE 방식일 때 분담 금액을 정확히 나눈다.")
    void splitBillsValueChanged() {
        Map<String, Double> splitDetails1 = new HashMap<>();
        divisions = BillSplitter.splitBillsValueChanged(amount, participants, splitDetails1);
        assertThat(divisions).isEqualTo(defaultResult);

        Map<String, Double> splitDetails2 = new HashMap<>();
        // A : +5000, B : -5000, C : +12000
        splitDetails2.put("A", +5000.0);
        splitDetails2.put("B", -5000.0);
        splitDetails2.put("C", +12000.0);

        Map<String, Double> expectedResult2 = new HashMap<>();
        expectedResult2.put("A", 19666.667);
        expectedResult2.put("B", 9666.667);
        expectedResult2.put("C", 26666.667);
        expectedResult2.put("D", 14666.667);
        expectedResult2.put("E", 14666.667);
        expectedResult2.put("F", 14666.667);

        divisions = BillSplitter.splitBillsValueChanged(amount, participants, splitDetails2);
        assertThat(divisions).isEqualTo(expectedResult2);
    }

    @Test
    @DisplayName("FIXED VALUE 방식일 때 분담 금액을 정확히 나눈다.")
    void splitBillsWithFixedValue() {
        Map<String, Double> splitDetails1 = new HashMap<>();
        divisions = BillSplitter.splitBillsWithFixedValue(amount, participants, splitDetails1);
        assertThat(divisions).isEqualTo(defaultResult);

        Map<String, Double> splitDetails2 = new HashMap<>();
        // A : +10000, B : 0
        splitDetails2.put("A", +10000.0);
        splitDetails2.put("B", 0.0);

        Map<String, Double> expectedResult2 = new HashMap<>();
        expectedResult2.put("A", 10000.0);
        expectedResult2.put("B", 0.0);
        expectedResult2.put("C", 22500.0);
        expectedResult2.put("D", 22500.0);
        expectedResult2.put("E", 22500.0);
        expectedResult2.put("F", 22500.0);

        divisions = BillSplitter.splitBillsWithFixedValue(amount, participants, splitDetails2);
        assertThat(divisions).isEqualTo(expectedResult2);
    }

    @Test
    @DisplayName("FIXED VALUE 방식일 때, participants의 인원과 splitDetails의 인원이 같은 경우 총액이 맞지 않으면 예외를 발생시킨다.")
    void splitBillsWithFixedValueFailTest() {
        Map<String, Double> splitDetails = new HashMap<>();
        splitDetails.put("A", 10000.0);
        splitDetails.put("B", 10000.0);
        splitDetails.put("C", 10000.0);
        splitDetails.put("D", 10000.0);
        splitDetails.put("E", 10000.0);
        splitDetails.put("F", 10000.0);

        assertThatThrownBy(() -> BillSplitter.splitBillsWithFixedValue(amount, participants, splitDetails))
                .isInstanceOf(IllegalArgumentException.class);
    }

    @Test
    @DisplayName("DRINK SEPARATE 방식일 때 분담 금액을 정확히 나눈다.")
    void splitBillsWithSeparateDrinks() {
        int drinkAmount = 40000;
        Map<String, Double> splitDetails1 = new HashMap<>();
        splitDetails1.put("A", 1.0);
        splitDetails1.put("B", 1.0);
        splitDetails1.put("C", 1.0);
        splitDetails1.put("D", 1.0);
        splitDetails1.put("E", 1.0);
        splitDetails1.put("F", 1.0);
        divisions = BillSplitter.splitBillsWithSeparateDrinks(amount, participants, splitDetails1, drinkAmount);
        assertThat(divisions).isEqualTo(defaultResult);

        Map<String, Double> splitDetails2 = new HashMap<>();
        // A, C, E가 마신 경우
        splitDetails2.put("A", 1.0);
        splitDetails2.put("C", 2.0);
        splitDetails2.put("E", 0.0);

        Map<String, Double> expectedResult2 = new HashMap<>();
        expectedResult2.put("A", 23333.333);
        expectedResult2.put("B", 10000.0);
        expectedResult2.put("C", 23333.333);
        expectedResult2.put("D", 10000.0);
        expectedResult2.put("E", 23333.333);
        expectedResult2.put("F", 10000.0);

        divisions = BillSplitter.splitBillsWithSeparateDrinks(amount, participants, splitDetails2, drinkAmount);
        assertThat(divisions).isEqualTo(expectedResult2);
    }

    @ParameterizedTest
    @ValueSource(strings = {"A", "B", "C", "D", "E", "F"})
    @DisplayName("TREAT 방식일 때 분담 금액을 정확히 나눈다.")
    void splitBillsWhenTreated(String payer) {
        divisions = BillSplitter.splitBillsWhenTreated(amount, payer);
        assertThat(divisions).hasSize(1);
        assertThat(divisions.get(payer)).isEqualTo(amount);
    }
}