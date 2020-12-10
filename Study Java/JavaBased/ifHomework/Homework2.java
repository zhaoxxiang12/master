package ifHomework;

import java.util.Scanner;

public class Homework2 {
    public static void main(String[] args) {
        // 输入一个整数，判断奇数还是偶数
        Scanner sc = new Scanner(System.in);
        System.out.println(" 输入整数");
        int score = sc.nextInt();
        if(score%2==0){
            System.out.println(score+"是偶数");
        }else{
            System.out.println(score+"是奇数");
        }
    }
}
