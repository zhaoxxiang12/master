package ObjectHomework;

import java.util.Arrays;
import java.util.Scanner;

public class TestMath {
    public static void main(String[] args) {
        MyMath myMath = new MyMath();
        // 求任意数的阶乘
        Scanner sc = new Scanner(System.in);
        System.out.println("请输入一个正整数");
        int num = sc.nextInt();
        String result = myMath.factorial(num);
        System.out.println(result);
        System.out.println("--------------------------------------------------");
        // 判断一个数100-999内是否为水仙花数
//       boolean flag= myMath.DaffodilNumber(99);
//       System.out.println(flag?"是水仙花数":"不是水仙花数");
       // 求100-1000以内所有的水仙花数
//        for (int i =100;i<1000;i++){
////            boolean isTrue = myMath.DaffodilNumber(i);
////            System.out.println(isTrue?i+"是水仙花数":i+"不是水仙花数");
//            // 加if判断，是打印为水仙花数的数字
//            if(myMath.DaffodilNumber(i)){
//                System.out.println(i+"是水仙花数");
//            }
//        }
        // 数组倒序
        double [] arr = null;
        myMath.ArrayReverse(arr);
        System.out.println(Arrays.toString(arr));

    }
}
