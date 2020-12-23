package HomeworkDemo;

import java.util.Locale;

public class StringDemo6 {
    public static void main(String[] args) {
         // 1.某个字符再字符串中出现的次数
        String s ="baidu_duliang_yp";
        String s1 = "你好我好大家好，才是真的好，你好吗";
        int index = s.indexOf("a");
        int index2 = s.indexOf("你好");
        int index3=s1.indexOf("你好",1); //结果14，表示从下标1开始进行查询，在下标14再次出现

        System.out.println(index);
        System.out.println(index2);
        System.out.println(index3);

        //2.某个字符最后一次出现的索引
        System.out.println(s.lastIndexOf("_"));

        // 3.将所有的字母变成大写字母
        String s3 = "abcsesasdqs";
        String s4 = "ABCDEQWSAWF";
        System.out.println(s3.toUpperCase());
        System.out.println(s3.toLowerCase());

        //4.去掉空格
        String s5 = " 3024545115 ";
        String s6 = "3024545115";
        String trim = s5.trim();//去掉两端空格
        System.out.println(s6.equals(trim));
        System.out.println(s6.equals(s5));
    }
}
