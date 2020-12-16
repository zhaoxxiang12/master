package ArrayFile;

import java.util.Arrays;
import java.util.Scanner;

public class ArrayDemo4 {
    public static void main(String[] args) {
//        String str = "I will call you !";
//        char [] ch= new char[str.length()];// 数据在创建的时候需要定义长度
//        // 通过字符串来获取每一个字符
//        for(int i = 0;i<str.length();i++){
//            char c=str.charAt(i);
//            ch [i] =c; //从字符串中获取每一个字符并存放到对应的字符数组中
//        }
//        System.out.println(Arrays.toString(ch));
        /**
         * 键盘输入一个字符串，将每一个字符存放到数组中
         */
//        Scanner sc =new Scanner(System.in);
//        System.out.println("输入字符");
//        String str = sc.nextLine();
//        char ch [] = new char [str.length()];
//        for (int i = 0 ; i<str.length();i++){
//            ch[i] = str.charAt(i);
//        }
//        System.out.println(Arrays.toString(ch));

        /**
         *
         * 键盘输入一段文字，提示用户输入一个字符，统计该字符出现的次数
         */
//        int [] arr = {1,2,1,1,3,30,1,2,99};
//        int count=0;
//        Scanner sc = new Scanner(System.in);
//        System.out.println("请输入要查找的字符");
//        int num = sc.nextInt();
//        for (int i = 0;i<arr.length;i++) {
//            if(arr[i]==num){
//                count++;
//            }
//        }
//        System.out.println("共出现"+count+"次");
        /**
         * 统计下面水果出现最多的次数以及他的名字
         */
        String[] fruits = {"苹果", "火龙果", "苹果", "香蕉", "桃子", "菠萝", "梨"};
        int appleCount = 0;
        int dragonFruitCount = 0;
        int bananaCount = 0;
        int pearCount = 0;
        int peachCount = 0;
        int pineappleCount = 0;
        for (int i = 0; i < fruits.length; i++) {
            if (fruits[i] == "苹果") {
                appleCount++;
            } else if (fruits[i] == "火龙果") {
                dragonFruitCount++;
            } else if (fruits[i] == "香蕉") {
                bananaCount++;
            } else if (fruits[i] == "桃子") {
                peachCount++;
            } else if (fruits[i] == "菠萝") {
                pineappleCount++;
            } else if (fruits[i] == "梨") {
                pearCount++;
            } else {
                System.out.println("没有该水果");
            }
        }
        int[] count = {appleCount, dragonFruitCount, bananaCount, peachCount, pineappleCount, pearCount};
        int max = count[0];
        for (int i = 0; i < count.length; i++) {
            for (int j = 0; j < count.length - 1; j++) {
                if (count[j] > count[j + 1]) {
                    max = count[j];
                }
            }
        }
        if (max == appleCount) {
            System.out.println("出现次数最多的是苹果总共出现了" + max + "次");
        } else if (max == dragonFruitCount) {
            System.out.println("出现次数最多的是火龙果总共出现了" + max + "次");
        } else if (max == bananaCount) {
            System.out.println("出现次数最多的是香蕉总共出现了" + max + "次");
        } else if (max == peachCount) {
            System.out.println("出现次数最多的是桃子总共出现了" + max + "次");
        } else if (max == pineappleCount) {
            System.out.println("出现次数最多的是菠萝总共出现了" + max + "次");
        } else if (max == pearCount) {
            System.out.println("出现次数最多的是梨总共出现了" + max + "次");
        } else {
            System.out.println("统计有误");
        }
    }
}
