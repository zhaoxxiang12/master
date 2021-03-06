package Polymorphism;

/**
 * 由于字符串大量拼接造成的性能低下问题,我们给出一个解决方案
 * 字符串缓冲区(StringBuilder是StringBuffer的剪切版)  StringBuffer 都是类
 */
public class TestTime2 {
    public static void main(String[] args) {
        StringBuffer buffer   = new StringBuffer(); // 创建了一个字符串缓冲区,但空间只有一个,所有的操作都是在同一个缓冲区内完成,不会创建新的空间
        long start = System.currentTimeMillis(); // 时间戳

        for (int i =0;i<1000000;i++){ //java.lang.OutOfMemoryError: Java heap space  堆溢出错误
            buffer.append("asdfgnjhksafgasdsad2asdasdwqwhjghjfghjfjghfjhfjfhjfjhfdasdasd");
        }
        long end = System.currentTimeMillis();
        System.out.println("程序共耗时"+(end-start)+"ms"); //程序共耗时2ms
        //String 每次操作其实都是创建一个新的字符串(浪费时间,消耗时间)
    }
}
