package StringHomework;

import java.util.StringTokenizer;

public class Homework1 {
    public static void main(String[] args) {
//        String date = "2018-11-12";
//        System.out.println(date.replace("-", ""));
//        String a = "201811";
//        // 方法一
//        int count = 0;
//        for (int i = 0; i < a.length(); i++) {
//            if ('1' == a.charAt(i)) {
//                count++;
//            }
//        }
//        System.out.println(count);
//        //方法二
//        char[] ch = a.toCharArray();//转换成数组
//        int count2 = 0;
//        for (int i = 0; i < ch.length; i++) {
//            if ('1' == ch[i]) {
//                count2++;
//            }
//        }
//        System.out.println(count2);
//        // 方法三 使用indexOf 做  indexOf若找不到元素就返回-1
//        int count3 = 0;
//        int start = 0;//查找的起始索引
//        a.indexOf("1"); // 第一次出现的下标为2  因为此时属于不确定循环，建议使用while循环
//        while (a.indexOf("1", start) != -1) {//这里的start用来做判断使用
//            count3++;
//            start = a.indexOf("1", start) + 1;
//        }
//        System.out.println(count3);
        /**
         * string = "12345678901234567890",打印效果如下：
         * 1
         * 23
         * 456
         * 7890
         * 12345
         * 67890
         */
        String string = "12345678901234567890";
        int row =0;
        for (int i = 0; i < 6; i++) {
            char[] chr = string.toCharArray();
            for (int j = 0;j<chr.length;j++){
                System.out.println(chr[j]);
            }
            System.out.println();
        }
    }
}
