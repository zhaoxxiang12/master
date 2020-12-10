package ifHomework;

import java.util.Scanner;

public class Homework1 {
    public static void main(String[] args) {
        /**
         *
         * 从控制台输入一个学生成绩，如果张浩的java成绩大于90，获得一个MP4
         */
        Scanner sc = new Scanner(System.in);
        System.out.println(" 输入成绩");
        int score = sc.nextInt();
        if (score>90){
            System.out.println(" 得到一个MP4");
        }else{
            System.out.println(" 成绩没有达到预期，不能获得奖励");
        }
    }
}
