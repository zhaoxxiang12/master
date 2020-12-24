package StringPackage;

import java.util.Arrays;

public class StringDemo {
    public static void main(String[] args) {
        /**
         * str = "I love you" 变为 you love I
         */
        String str = "I love you";
        String[] split = str.split(" ");
        System.out.println(Arrays.toString(split));
        for(int i =split.length-1;i>=0;i--){
            System.out.println(split[i]+" ");
        }
        // 字符串的分割 split(regx)

    }
}
