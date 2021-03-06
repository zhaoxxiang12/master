package Packaging;

public class Test2 {
    public static void main(String[] args) {

        // 如何将整数转换成字符串
        Integer a = new Integer(100);  // 自动装箱完成的
        int b =a; // 自动拆箱
        System.out.println(a.toString()); // 打印出来的都是字符串

        Integer d = new Integer("2000");
        //java.lang.NumberFormatException 字符串转整形: 数字格式化异常
        int e = d;
        System.out.println(e);

        String str = "1234556";
//        new Integer(str); // 匿名对象(没有变量名)占用空间就是垃圾
        Integer num = new Integer(str); //字符串转整形

        int num2 = Integer.parseInt(str); // 推荐使用此方法,将字符串解析成我们的数字
        Integer valueOf= Integer.valueOf("123");
        System.out.println(valueOf);
        // 如何将整数转换成字符串
        String s = 1+"";
        Integer aa = 102;
        String s2 = aa.toString();
    }
}

