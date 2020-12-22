package ObjectHomework;

import java.util.Arrays;

public class TestVerify {
    public static void main(String[] args) {
        // 四位数字验证码
        VerifyCode verifyCode = new VerifyCode();
        String num = verifyCode.randomNumber();
        System.out.println(num);
        // 6位验证码带字母
        String code = verifyCode.random6Code();
        System.out.println(code);
    }
}
