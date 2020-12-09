package DataTypeConversion;

/**
 * 重点：
 * 1.八大数据类型对应的字节数及中英文
 * 2.char 类型的运算  （大小写转换）
 * 3。float 可以由哪些类型表示
 * 4.隐式转换，手动强制转换（误差【内存溢出，精度损失】）
 */
public class FloatMethod {
    public static void main(String[] args) {
        //float用法
        byte a1 = 10;
        short a2 = 10;
        int a3 = 30;
        long a4 = 40L;

        float aa1 = a1;
        float aa2 = a2;

        //易错
        float aq3=a3; //float 范围>int范围   float范围>long范围
        float aa4 = a4;

        float x= 076; // 076会转换成10进制62
        float y = 0xabcef; //16进制会转换成10进制
        float z = 'a'; // ‘a' → 97
        float f = 076f;//标准的float类型

        // double 是八大基本数据类型中范围最大的
        // boolean 类型 true/false 不能参与运算
//        float j = 3e3; //科学计数法 XEY （X*10^y) 浮点型double
//        System.out.println(076);
//        System.out.println(x);
//        System.out.println(y);
//        System.out.println(z);
//        System.out.println(3e3);
//        System.out.println(0.9D);

        // 精度损失
        int data = (int)18.9; //取整 不会四舍五入
        float test2 = 0.98546754444444444444444444444444478775F;
        float test3 =(float) 0.98546754444444444444444444444444478775F;
        System.out.println(data);
        System.out.println(test2); //  0.98546755
        System.out.println(test3); //  0.98546755
        System.out.println(7.22-7.2); // 浮点型本身就存在精度差

        // 内存溢出
        short test1 = (short)32768;
        System.out.println(test1);

    }
}
