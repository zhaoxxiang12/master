package StringPackage;

public class StringDemo2 {
    public static void main(String[] args) {
        /**
         * 面试考点
         */
        String s1 = "上海";
        String s2 ="上海";
        System.out.println(s1 == s2);//地址是是一样的，结果为true

        String s3 = new String(); //空字符串
        String s4 = new String("上海");
        System.out.println(s1 == s4);//false 只要出现new 则对象地址就是不一样的
        System.out.println(s3);

        // 工作中关心的是字符串的内容：str.equals(str2)

        boolean flag = s1.equals(s2);
        boolean flag2 = s1.equals(123);
        boolean flag3 = "123".equals(1243);//equals原理是一个一个字符进行比较

        System.out.println(flag);
        System.out.println(flag2);
        System.out.println(flag3);

        System.out.println("--------------大小写---------------");
        String s6 = "welcome to shanghai";
        String s7 = "WELCOME TO SHANGHAI";
        System.out.println(s6.equalsIgnoreCase(s7)); // 检索系统设计/验证码
    }
}
