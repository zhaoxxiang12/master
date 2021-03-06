package Polymorphism;

/**
 * 所有在java.lang.*都不需要手动导包,因为默认都是读取这个包的
 * StringBuilder是StringBuffer的子类
 * 字符串缓冲区 StringBuffer是线程安全的  StringBuilder是非线程安全的(适用于单线程环境下)
 * StringBuffer主要用于多线程环境下
 */
public class TestTime3 {
    public static void main(String[] args) {
        StringBuilder builder   = new StringBuilder(); // 创建了一个字符串缓冲区,但空间只有一个,所有的操作都是在同一个缓冲区内完成,不会创建新的空间
        long start = System.currentTimeMillis(); // 时间戳

        for (int i =0;i<1000000;i++){ //java.lang.OutOfMemoryError: Java heap space  堆溢出错误
            builder.append("asdfgnjhksafgasdsad2asdasdwqwhjghjfghjfjghfjhfjfhjfjhfdasdasd");
        }
        long end = System.currentTimeMillis();
        System.out.println("程序共耗时"+(end-start)+"ms"); //程序共耗时81ms
        //String 每次操作其实都是创建一个新的字符串(浪费时间,消耗时间)
    }

}
