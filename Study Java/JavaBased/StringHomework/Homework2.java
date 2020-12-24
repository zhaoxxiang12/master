package StringHomework;

import java.util.Scanner;

public class Homework2 {
    public static void main(String[] args) {
        /**
         * 从控制台输入几个数字（数字之前使用逗号分隔），从这些数字中找出最大值
         */
        Scanner sc =new Scanner(System.in);
        System.out.println("输入多个数字使用逗号分隔");
        String number =sc.nextLine();
//        System.out.println(number);
        String [] string =number.split(",");
        int max =Integer.parseInt(string[0]);
        int []  num = new int[string.length];
        try {
            for (int i = 1; i < string.length; i++) {
                num[i] = Integer.parseInt(string[i]); // 字符型数组转换成整型数组
                if (max < num[i]) {
                    max = num[i];
                }
            }
            System.out.println("最大值："+max);
        }catch (NumberFormatException e){
//            e.printStackTrace();
            System.out.println("输入类型有误");
        }

    }
}
