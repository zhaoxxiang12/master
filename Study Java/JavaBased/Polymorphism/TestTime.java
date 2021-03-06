package Polymorphism;

public class TestTime {
    public static void main(String[] args) {
       long start = System.currentTimeMillis(); // 时间戳
        String s1 = "";
        for (int i =0;i<10000;i++){
            s1 +="asdfgnjhksafgasdsad2asdasdwqwhjghjfghjfjghfjhfjfhjfjhfdasdasdasdasdasd";
        }
        long end = System.currentTimeMillis();
        System.out.println("程序共耗时"+(end-start)+"ms"); //程序共耗时2596ms
        //String 每次操作其实都是创建一个新的字符串(浪费时间,消耗时间)
    }
}
