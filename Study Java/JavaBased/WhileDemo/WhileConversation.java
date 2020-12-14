package WhileDemo;

import java.util.Scanner;

public class WhileConversation {
    public static void main(String[] args) {
        /**
         *
         * 分类
         * while 当型循环
         * do.....while 直到型循环
         * for 循环  使用最多的循环
         *
         *
         */
        // 求1+2+....+100

//        int num=1;
//        int sum = 0;
//        while(num<=100){
//            num = num +1;
//            sum = num +sum;
//        }
//        System.out.println(num);
//        System.out.println(sum);

        // 计算100以内的奇数和
//        int i = 1;
//        int sum = 0;
//        while (i <= 100) {
//            sum = sum + i;
//            i = i + 2;
//
//
//        }
//        System.out.println(sum);
        // 方法2
//        while (i<=100){
//            if(i%2!=0){
//                sum +=i;
//            }
//            i++;
//        }
//        System.out.println(sum);

        /**
         *
         * 使用while 分别计算100以内奇数和和偶数和
         *
         */

//        int number = 1;
//        int oddNumberCount = 0;//奇数和
//        int evenNumberCount = 0; // 偶数和
//        while (number<=100){
//            if(number%2==0){
//                evenNumberCount+=number;
//            }else {
//                oddNumberCount+=number;
//            }
//            number++;
//        }
//        System.out.println("偶数和"+evenNumberCount);
//        System.out.println("奇数和"+oddNumberCount);
        /**
         *
         * 计算1+4+7+....+100 以及平方和
         */
//        int i = 1;
//        int sum =0;
//        long squareSum = 0;
//        while(i<101){
//            sum = sum+i;
//            squareSum +=  i*i;
//            i = i +3;
//        }
//        System.out.println(sum);
//        System.out.println(squareSum);

        /**
         *
         * 求6! = 1*2*3*4*5*6
         */
//        int i = 1;
//        int sum = 1;
//        while (i<=6){
//            sum*=i;
//            i++;
//        }
//        System.out.println(sum);
        /**
         *
         * 控制台输入一个数，求这个数的阶乘
         */
        Scanner sc= new Scanner(System.in);
        System.out.println("输入一个数");
        int number =sc.nextInt();
        int sum =1;
        if(number < 0){
            System.out.println("负数没有阶乘");
        }else if (number ==0){
            System.out.println("0的阶乘为1");
        } else {
            while (number>0){
                if(number > 0){
                    sum*=number;
                    number--;
                }

            }
            System.out.println(sum);
        }


    }
}
