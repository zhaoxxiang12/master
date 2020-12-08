package javaDate;

import java.util.Scanner;

public class work6 {
    public static void main(String[] args) {
        //整数转换成字符串输出 如：123，输出00132 （1234，012345）
        // 思路：n位数，不足的位填0，"%0nd"
        Scanner sc = new Scanner(System.in);
        System.out.println("输入数值");
        long num = sc.nextLong();
        String format = String.format("2019%05d", num);
        System.out.println(format);

    }
}
