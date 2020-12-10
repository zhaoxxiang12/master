package ifHomework;

import java.util.Scanner;

public class Homework3 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("输入java的分数");
        int javaScore = sc.nextInt();
        System.out.println("输入SQL的分数");
        int SQLScore = sc.nextInt();
        int differenceScore = Math.abs(javaScore - SQLScore);
        float totalScore = SQLScore+javaScore;
        float averageScore  = (totalScore/2);
        System.out.println("分数差为："+differenceScore);
        System.out.println("总分："+totalScore);
        System.out.println("平均分为："+averageScore);


    }
}
