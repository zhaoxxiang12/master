package javaDate;

import java.util.Arrays;

public class work10 {
    public static void main(String[] args) {
        //一个字符串有多少中字符，以及每个字符有多少个
        String str = "qwesadawqasd21qbmg";
        //去重并统计
        String s = " ";
        char [] chs = new char[str.length()];
        for (int i = 0;i<str.length();i++){
            char ch = str.charAt(i);
            // 若不存在就放入，存在不放入
            for(int j = 0;j<chs.length;j++){
                if(s.indexOf(ch)==-1){
                    s+=ch;
                }
            }
        }
//        System.out.println(s);
        System.out.println(str+ "共有"+s.length()+"中字符");
         // 每种字符出现的次数
        for (int i = 0;i<s.length();i++){
            char ch = s.charAt(i);
            System.out.println(ch+" :" + count(ch,str)+"次");
        }
    }
    public static int count(char ch,String str){
        int count = 0;
        for(int i =0;i<str.length();i++){
            if(ch == str.charAt(i)){
                count++;
            }
        }
        return count;
    }
}
