package Polymorphism;

/**
 * String 中的实现equals的思路
 * 1.比较地址
 * 2.类型检查
 * 3.长度检查
 * 4.逐个字符进行比较
 */
public class Test {
    public static void main(String[] args) {
        String s1 = "123";
        String s2 = "123";
        String s3 = new String("123");
        String s4 = "1"+"2"+"3";  // 这几句话一共创建了几个字符串(5个)  字符串每次拼接都会产生一个新的字符串
        System.out.println(s4);
        int num = 123;
        long number =123;
        // String 重写了Object中的equals(),比较的是两字符串的内容
        s1.equals(s2); // true
        s1.equals(s3); // true
        s1.equals(123);


        // 八大三数据类型不属于object的子对象,她们属于特殊的类型
        Test t1  = new Test();
        Test t2 = new Test();
        t1.equals(t2); // fasle
        t1.equals(12);  // fasle
        t1.equals(13.0);// fasle
    }
}
