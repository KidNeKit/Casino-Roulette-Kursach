package com.bsuir.mercury.entity;

import java.util.Arrays;

public enum Number {
    ZERO(0, "green"),
    ONE(1, "red"),
    TWO(2, "black"),
    THREE(3, "red"),
    FOUR(4, "black"),
    FIVE(5, "red"),
    SIX(6, "black"),
    SEVEN(7, "red"),
    EIGHT(8, "black"),
    NINE(9, "red"),
    TEN(10, "black"),
    ELEVEN(11, "black"),
    TWELVE(12, "red"),
    THIRTEEN(13, "black"),
    FOURTEEN(14, "red"),
    FIFTEEN(15, "black"),
    SIXTEEN(16, "red"),
    SEVENTEEN(17, "black"),
    EIGHTEEN(18, "red"),
    NINETEEN(19, "black"),
    TWENTY(20, "black"),
    TWENTY_ONE(21, "red"),
    TWENTY_TWO(22, "black"),
    TWENTY_THREE(23, "red"),
    TWENTY_FOUR(24, "black"),
    TWENTY_FIVE(25, "red"),
    TWENTY_SIX(26, "black"),
    TWENTY_SEVEN(27, "red"),
    TWENTY_EIGHT(28, "black"),
    TWENTY_NINE(29, "black"),
    THIRTY(30, "red"),
    THIRTY_ONE(31, "black"),
    THIRTY_TWO(32, "red"),
    THIRTY_THREE(33, "black"),
    THIRTY_FOUR(34, "red"),
    THIRTY_FIVE(35, "black"),
    THIRTY_SIX(36, "red");

    private final Integer number;
    private final String color;

    Number(Integer number, String color) {
        this.number = number;
        this.color = color;
    }

    public static String getColorByNumber(Integer number){
        return Arrays.stream(Number.values())
                .filter(value -> value.getNumber().equals(number))
                .findFirst().get().getColor();
    }

    public Integer getNumber() {
        return number;
    }

    public String getColor() {
        return color;
    }
}
