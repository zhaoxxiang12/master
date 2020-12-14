package WhileDemo;

import java.util.Scanner;

public class WhileConversation2 {
    public static void main(String[] args) {
        /**
         *
         * while 嵌套循环
         *
         * 1.获取1  4 7 10 13 16
         * 2.求阶乘
         * 3.求和
         * 4.0！=1
         */
//        int a =1;
//        int sum = 0;
//        int c =1;
//
//        while (c<=16){
//            int d = c;
//            int e = 1;
//            while (d>0){
//                e*=d;
//                d--;
//            }
//            sum += e;
//            c+=3;
//        }
//        System.out.println(sum);

        /**
         *
         * 菲波拉契数列  1 1 2 3 5 8 13 21
         * 说明：从第3项开始，每一项都等于前两项之和
         *
         */
        Scanner sc = new Scanner(System.in);
        System.out.println("输入月份");
        int month = sc.nextInt();
        if (month == 1 || month == 2) {
            System.out.println("第" + month + "月份，共有1对兔子");
        } else {
            int firstMonth = 1; // 第一个月兔子的对数
            int secondMonth = 1;// 第二个月兔子的对数
            int rabbitNumber = 0;//兔子数量
            int controlMonth = 3; // 控制第三个月 到第n个月
            while (month >= controlMonth) {
                rabbitNumber = firstMonth + secondMonth;
                firstMonth = secondMonth;
//                System.out.println(firstMonth);
                secondMonth = rabbitNumber;
//                System.out.println(secondMonth);
                controlMonth++;
            }
            System.out.println("第" + month + "月份，共有" + rabbitNumber + "对兔子");
            sc.close();
        }
    }
}
