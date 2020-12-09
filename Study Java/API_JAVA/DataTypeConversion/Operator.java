package DataTypeConversion;

public class Operator {
    public static void main(String[] args) {
        /**
         * 1.算术运算符
         * 2.关系运算符
         * 3.逻辑运算符
         * 4.赋值运算符
         * 5.其他运算符
         */
        // 加法
        int a = +10; //正数
        int b = 3+5;
        String city = "南充";
        String year = "2019";
//        System.out.println(a);
//        System.out.println(city+year); //字符串相加就是拼接字符串
//        System.out.println(b);

        // 字符串和任意结果拼接都将会编程字符串
//        System.out.println(b+city+year);
//        System.out.println("result:"+3*3); // result:9
//        System.out.println("result:"+3+3);// result:33
//        System.out.println("result:"+3/3);// result:1

        // 减法
        int c= -10; //负数
        int d = 3-5; // 数学减法

        // 乘法
//        System.out.println(10*10*10);

        // 除法 (Java默认整除)
        System.out.println(9/2); // 等于4
        System.out.println(9.0F/2);

        int scoreA = 90;
        int scoreB = 97;
        int scoreC = 88;
        // 求三个数的平均数
//        System.out.println((float)(scoreA+scoreB+scoreC)/3);

        // 取余  %
        System.out.println(8%3);

        int score = 678;
        // 获取个位、十位、百位
        int bai = score/100;
        int shi = score/10%10;
        int ge = score%10;
        System.out.println(bai);
        System.out.println(shi);
        System.out.println(ge);
    }
}
