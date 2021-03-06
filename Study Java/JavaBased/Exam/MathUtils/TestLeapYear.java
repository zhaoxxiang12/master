package Exam.MathUtils;

import Exam.MathUtils.MathUtils;

public class TestLeapYear {
    public static void main(String[] args) {
        MathUtils mathUtils = new MathUtils();
        int year = 2000;
        System.out.println( mathUtils.IsLeapYear(year)?+year+"年是闰年":"不是闰年");


        String phoneNumber = "12345678901";
        String phoneNumber2 = "13345678901";
        String phoneNumber3 = "15345678901";
        System.out.println(mathUtils.IsRightPhoneNumber(phoneNumber)?"是合格号码":"不是合格号码");
        System.out.println(mathUtils.IsRightPhoneNumber(phoneNumber2)?"是合格号码":"不是合格号码");
        System.out.println(mathUtils.IsRightPhoneNumber(phoneNumber3)?"是合格号码":"不是合格号码");
    }
}
