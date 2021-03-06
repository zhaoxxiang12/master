package Polymorphism;

/**
 * API  叫做应用程序接口
 */
public class Test4 {

    public static void main(String[] args) {
        // 1. String 与StringBuilder、StringBuffer的相互转换
        String s1 = "welcome to Shanghai";
        StringBuilder builder = new StringBuilder(s1);
//        System.out.println(builder + "123");
        String s2 = builder + "123";
//        System.out.println(s2);
        builder.append(1);
        System.out.println(builder.append(1));

        // 3.Java支持链式编程
        builder.append(true).append(",").append(false).append("OK");
        // 2. StringBuilder恢复成字符串

        String s5 =  builder.toString();  // 将对象转换成字符串
        System.out.println(s5);

    }
}
