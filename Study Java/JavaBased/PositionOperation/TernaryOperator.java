package PositionOperation;

public class TernaryOperator {
    // 一元运算符 ++ -- ！
    // 二元运算符 + - * / % ~ & | && ||
    //三元运算符   语法：类型  变量 条件表达式？ 事件一：事件二  三元运算符  ？ ：
    // 条件为真  执行事件1   条件为假  执行事件2
    public static void main(String[] args) {
//        int a = 10;
//        int b = 30;
//        int max = a>b?a:b;
//        int  min = a<b?a:b;
//        System.out.println("最大值："+max);
//        System.out.println("最小值："+min);
        /**
         * 练习1
         */
        // 求xyz最大值与最小值
//        int x=10,y=20,z=30;
//        int max2 = x>y?x:y;
//        max2=max2>z?max2:z;
//        int min2 = x<y?x:y;
//        min2 = min2<z?min2:z;
//        System.out.println("最大值："+max2);
//        System.out.println("最小值："+min2);
        /**
         * 练习2
         * 控制台 打印输出性别
         * 0：男  1：女
         */
        byte sex = 0;
        byte a=0;
        char sex2 = (a==0?'男':'女');
//        System.out.println(sex==0?"性别:男":"性别:女");
//        System.out.println("性别:"+(sex==0?'男':'女'));
        System.out.println(sex2);
    }


}
