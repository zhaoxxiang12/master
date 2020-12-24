package StringHomework;

import java.util.Arrays;

public class TestArray {
    public static void main(String[] args) {
//        String[] str = {"abc", "bcd", "def"};
//        StringBuffer sb = new StringBuffer();
//        for(int i = 0; i < str.length; i++){
//            sb. append(str[i]);
//        }
//        String s = sb.toString();
//        System.out.println(s);
//        String s1 = "我java";
//        StringBuilder stringBuilder = new StringBuilder(s1);
//        stringBuilder.insert(1,"正在学");
//        s1 = stringBuilder.toString();
//        System.out.println(s1);
//        String s2 ="";
//        System.out.println(s2.length());
//        String s4 =new String();
//           String s = "";
//           int startIndex =0;
//           int endIndex =1;
//           String s1 ="acbdsd";
//           StringBuilder sb =new StringBuilder();
//           for(int i=1;i<=3;i++){
//               String temp = s1.substring(startIndex,endIndex);
//               startIndex =endIndex;
//               endIndex++;
//               sb.append(temp);
//               s = sb.toString();
//           }
//        System.out.println(s);

        /**
         * 字符串转字符串数组
         */
        String string = "abc,def,ghi";
        String [] strArr= string.split(","); //注意分隔符是需要转译
//        System.out.println(Arrays.toString(strArr));
        String a ="12";
        String b = "123";
        String c = "5451289";
        System.out.println(b.contains(a));
        System.out.println(c.equals(a));
    }
}
