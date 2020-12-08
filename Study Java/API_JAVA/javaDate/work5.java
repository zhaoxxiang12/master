package javaDate;

import java.util.Scanner;

public class work5 {
    public static void main(String[] args) {
        //控制台输入金额并使用字符串输出比如1000000，输出100，000，
        Scanner sc = new Scanner(System.in);
        System.out.println("输入金额");
        long money = sc.nextLong();
        String formatMoney = String.format("￥%,d",money);
        System.out.println(formatMoney);
    }
}
