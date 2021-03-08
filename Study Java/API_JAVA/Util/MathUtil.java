package Util;

/**
 * 可变参数  语法：数据类型...变量
 * 可变参数：数组长度会根据实参数量可变
 */
public class MathUtil {
    public static int add(int... num) {
        int sum = 0;
        if (num == null) {
            return 0;
        }
        for (int i : num) {
             sum += i;
        }
        return sum;
    }
    public static void main(String[] args) {
        int sum1=  add();
        int sum2=add(1, 2);
        int sum3= add(1, 23, 3);
        System.out.println(sum1);
        System.out.println(sum2);
        System.out.println(sum3);

    }
}
