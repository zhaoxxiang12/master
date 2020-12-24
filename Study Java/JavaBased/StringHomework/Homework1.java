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
         * 1  [0,1)
         * 23 [1,3)
         * 456 [3,6)
         * 7890 [6,10)
         * 12345 [10,15)
         * 67890
         */
        String string = "12345678901234567890";
        int startIndex = 0;
        int endIndex = 1;
//        for (int i = 1; i < 7; i++) {
//            String temp ="";
//            System.out.println("第"+i+"循环");
//            String value = string.substring(startIndex, endIndex);
//            StringBuilder stringBuilder = new StringBuilder(); //StringBuilder是可变字符串
//            stringBuilder.append(value);
//            temp =stringBuilder.toString();
//            System.out.println(temp);
//            if(i>=2 || i<=3){
//                startIndex = endIndex;
//                endIndex = temp.length()+2;
//            }else if(i==4){
//                startIndex = endIndex;
//                endIndex = temp.length()+4;
//            }else if(i==5||i==6){
//                startIndex = endIndex;
//                endIndex = temp.length()+5;
//            }
//
//        }
//        System.out.println(temp);
        for (int i = 1; i <= 6; i++) {
            if (i >= 1 && i <= 5) {
                endIndex = (i + 1) * i / 2;
                String value = string.substring(startIndex,endIndex);
                System.out.println(value);
            } else {
                endIndex = string.length();
                String value = string.substring(startIndex,endIndex);
                System.out.println(value);
            }
            startIndex = endIndex;

        }
    }
}
