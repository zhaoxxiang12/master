package StringHomework;

import java.util.Scanner;

public class Homework5 {
    public static void main(String[] args) {
        /**
         * 敏感词进行过滤，如：军火  色情  恐怖  枪 爆炸等
         */
        String [] sensitive ={"色情","军火","枪","恐怖","爆炸"};
        Scanner sc = new Scanner(System.in);
        System.out.println("输入一句话");
        String str = sc.nextLine();
        //方法一
        for (int i=0;i<sensitive.length;i++){
            if(str.contains(sensitive[i])){
                str=str.replace(sensitive[i],"******");
            }
        }
        System.out.println(str);

        //方法二
        String str2 = sc.nextLine();
        for (int i=0;i<sensitive.length;i++){
            while(str2.indexOf(sensitive[i])!=-1){
                str2=str2.replace(sensitive[i],"******");
            }
        }
        System.out.println(str2);
    }
}
