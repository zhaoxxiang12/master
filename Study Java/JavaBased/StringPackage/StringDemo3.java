package StringPackage;

import java.util.Arrays;

public class StringDemo3 {
    public static void main(String[] args) {
        // 字符串求长度 str.length()  求长度是一个字符串中的方法
        String s1 = "上海20212 11";
        String s2 = "四面楚歌，狂风暴雨";
        System.out.println(s1.length());
        System.out.println(s2.length());


        //2.通过索引来获取具体索引处的字符
        char ch = s1.charAt(1);
        System.out.println(ch);

        //3.如何将字符串转换成字符组
        char [] chs = s1.toCharArray();

        //如何直接输出一个数组中的内容：使用数组的辅助类工具Array.toString(arr)
        System.out.println(Arrays.toString(chs));
        //4.字符串如何遍历
        for(int i = 0;i<s1.length();i++){
            char ch2 = s1.charAt(i);
            System.out.println(ch2);
        }
        //5.如何将字符数组转换成字符串
        char [] arr = {'1','A','b','c','你','好'};
        String string = String.valueOf(arr);
        String s18 = new String(arr);
        System.out.println(string);


        //6.将基本数据类型转换成字符串
        System.out.println( String.valueOf(12.3));
        System.out.println( String.valueOf(12));
        System.out.println( String.valueOf(true));

        // 任意类型和字符串拼接都是字符串
        System.out.println(12.3+"AA");
        System.out.println(12.3+"AA");
        System.out.println(12+"AA"+'国');

        //7.字符串拼接的方法concat
        String s10 = "四面楚歌";
        String s11 = "霸王别姬";
        String concat = s10.concat(s11);
        String concat1= s10 +","+s11;
        String concat2 = s10.concat(",").concat(s11);
        System.out.println(concat);
        System.out.println(concat1);
        System.out.println(concat2);


    }
}
