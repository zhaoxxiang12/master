package ArrayHomework;

import java.util.Arrays;
import java.util.Scanner;

public class Homework1 {
    public static void main(String[] args) {
        /**
         一个学生有八门功课，求这个学生的总分 平均分 最高分
         *
         */
//        int[] score = {88, 97, 98, 100, 85, 86, 99, 98};
//        double count = 0;
//        double average = 0;
//        // 总分
//        for (int i = 0; i < score.length; i++) {
//            count += score[i];
//        }
//        average = count / score.length;
//        //求最大值
//        int max = score[0];
//        for (int i = 0; i < score.length; i++) {
//            if (score[i] > max) {
//                max = score[i];
//            }
//        }
//        System.out.println("总分：" + count);
//        System.out.println("平均分：" + average);
//        System.out.println("最高分：" + max);
        /**
         *
         * 用数组定义12个 学生的成绩 ，90以上为A 80-89为B  70 - 79 为C  60-69 为D  0-59 为E
         * 并统计不同等级的分数的人数
         */
//        int [] score={55,60,89,95,96,99,100,70,78,65,66,80};
//        int [] count = new int[5];
//        for(int i  = 0; i<score.length;i++){
//            if(score[i]>=90){
//                count[4]++;
//            }else if(score[i]>=80&&score[i]<=89){
//                count[3]++;
//            }else if(score[i]>=70&&score[i]<=79){
//                count[2]++;
//            }else if(score[i]>=60&&score[i]<=69){
//                count[1]++;
//            }else if(score[i]>=0&&score[i]<=59){
//                count[0]++;
//            }else{
//                System.out.println("非法分数");
//            }
//        }
//        System.out.println("A级"+count[4]);
//        System.out.println("B级"+count[3]);
//        System.out.println("C级"+count[2]);
//        System.out.println("D级"+count[1]);
//        System.out.println("E级"+count[0]);
        /**
         * 输入10个数存入数组中，然后复制到b数组中
         */
//        Scanner sc = new Scanner(System.in);
//        int [] arr = new int[10];
//        for (int i = 0;i<10;i++){
//            System.out.println("输入一个数字");
//            arr[i]=sc.nextInt();
//        }
//        int [] copyArr = new int[10];
//        for (int j = 0;j<10;j++){
//            copyArr[j] = arr[j];
//        }
//        System.out.println(Arrays.toString(copyArr));

        /**
         *  输入10个数存入数组中 ，然后再输入一个数字进行查找，有则返回1，无则返回-1
         */
        Scanner sc = new Scanner(System.in);
        int[] arr = new int[10];
        for (int i = 0; i < 10; i++) {
            System.out.println("输入一个整数");
            arr[i] = sc.nextInt();
        }
        System.out.println("输入要查找的数字");
        int findNum = sc.nextInt();
        int count = 0;
        for (int j = 0; j < arr.length; j++) {
//            if(findNum==arr[j]){
//                System.out.println(j);//打印数组下标
//                break;// 提高效率
//            }
            if (findNum != arr[j])
                continue;
                System.out.println(j);
                count++;


        }
        if(count==0){
            System.out.println("未找到：-1");
        }
    }
}



