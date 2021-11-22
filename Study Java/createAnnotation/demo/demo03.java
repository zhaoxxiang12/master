package demo;

public class demo03 {
    public static void main(String[] args) {
        A a = new A();
        a.show(); //加了 @Deprecated 表示该方法已过时
        a.show2();
    }
}
class A {
    @Deprecated
    public void show () {
        System.out.println("你好");
        System.out.println("你好,世界");
    }
    public void show2() {
        System.out.println("你好,中国");
    }
}