package ifHomework;

import java.util.Scanner;

public class Homework5 {
    public static void main(String[] args) {
        // 如果存款超过500W,就买凯迪拉克 否则 如果存款100W 帕萨特
        // 存款超过50W 伊兰特 10W 奥托 10W一下 捷安特
        Scanner sc = new Scanner(System.in);
        System.out.println("输入金额");
        int money = sc.nextInt();
        if (money > 5000000) {
            System.out.println("凯迪拉克");
        } else if (1000000 < money && money <= 5000000) {
            System.out.println("帕萨特");
        } else if (500000 < money && money <= 1000000) {
            System.out.println("伊兰特");
        } else if (100000 < money && money <= 500000) {
            System.out.println("奥托");
        } else if (0 <= money && money <= 1000000) {
            System.out.println("捷安特");
        }else{
            System.out.println("非法数字");
        }
    }
}

