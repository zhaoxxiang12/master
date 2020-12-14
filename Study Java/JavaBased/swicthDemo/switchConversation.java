package swicthDemo;

import java.util.Scanner;

public class switchConversation {
    public static void main(String[] args) {

//        int num= 10;
//        if(num%2==0){
//            return; // return 会直接返回 （出栈，后续代码都将不会执行） ，return 可以改变程序的流向
//            // if else 程序中最多出现3~4层嵌套
//        }else {
//            System.out.println("1");
//        }
        /**
         * 键盘获取两个整数，放入到a和b，如果a》=b,就互换值，否则就不交换。目的就是让a的值总是小于或者等于b
         *
         */

//        Scanner sc = new Scanner(System.in);
//        System.out.println("请输入一个整数");
//        int a = sc.nextInt();
//        System.out.println("请输入一个整数");
//        int b = sc.nextInt();
//        if (a >= b) {
//            int c = a;
//            a = b;
//            b = c;
//        } else {
//            a = a;
//            b = b;
//        }
//        System.out.println(a);
//        System.out.println(b);
//        sc.close();

        /**
         * 开关选择语句
         *
         * switch (条件){
         *     case  常量:
         *     执行条件1成立的代码
         *     break；
         *     case 常量:
         *     执行条件2成立的代码
         *          *     break；
         *      default：
         *      都不满足执行
         *      break;
         * }
         *使用数据基本类型： byte  short int  char  不能用 long  Boolean float  double
         * 引用类型： String enum枚举
         *
         */
        // 键盘输入数字控制台输出星期几

        Scanner sc = new Scanner(System.in);
        System.out.println("输入数字");
        int num = sc.nextInt();
//        switch (num) {
//            case 1:
//                System.out.println("周一");
//                break;
//            case 2:
//                System.out.println("周二");
//                break;
//            case 3:
//                System.out.println("周三");
//                break;
//            case 4:
//                System.out.println("周四");
//                break;
//            case 5:
//                System.out.println("周五");
//                break;
//            case 6:
//                System.out.println("周六");
//                break;
//            case 7:
//                System.out.println("周日");
//                break;
//            default:
//                System.out.println("输入有误");
//                break;
//        }
//        sc.close();
        System.out.println("1.登录 2.注册 3.退出");
        switch (num) {
            case 1:
                System.out.println("登录");
                break;
            case 2:
                System.out.println("注册");
                break;
            case 3:
                System.out.println("退出");
                System.exit(0);
                break;
            default:
                System.out.println("输入无效");
                break;
        }

    }
}
