package ObjectHomework;

import java.util.Arrays;
import java.util.Random;

public class VerifyCode {
    public String randomNumber(){//随机生成四位数字1-9之间
        Random random = new Random();
        String str = "";
        for(int i =0;i<4;i++){
           str +=random.nextInt(10);
        }
        return str;
    }
    public String random6Code(){
        char [] ch = new char[62];
        int index = 0;
        for(char i = 'a';i<='z';i++){
            ch[index++]=i;
        }
        for(char i = '0';i<='9';i++){
            ch[index++]=i;
        }
        for(char i = 'A';i<='Z';i++){
            ch[index++]=i;
        }
//        System.out.println(Arrays.toString(ch));
        // 产生6位验证码
        Random random = new Random();
        String code = "";
        for(int i = 0;i<6;i++){
            code+=ch[random.nextInt(62)];
        }
        return code;
    }


}
