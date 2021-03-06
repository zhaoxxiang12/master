package Packaging;

public class Test1 {
    public static void main(String[] args) {
        /**
         * 八大数据类型:1byte: byte  boolean
         * 2byte:char short
         * 4byte:int float
         * 8byte:long double
         */
        int a =10;  // int 整形
        // int 的包装类型:整形类 Integer
        Integer b = 10;
        Integer c = a;  // 自动装箱

        int d = c; // 自动拆箱
        System.out.println(a==b);
        System.out.println(b);

        // Integer 与 int 的区别
        Integer num = null;
//        int num2 = null;  // 此定义会报错


//        Object b = 10;
    }
}
