package ObjectInheritance2;

import ObjectInheritance.FU;

public class ZI extends FU {
    int num = 20;//成员变量（对象变量）
    int age = 18;

    public void show() {
        int num = 100;//局部变量
        System.out.println(num); //就近原则（永远使用范围最近的变量）
        System.out.println(this.num); //当前类的成员变量
        System.out.println(super.num);//父类的成员变量
    }

    public void test() {
        System.out.println("子类test方法");
        // 子类如何调用父类的方法
        super.info();//语法：super.方法名   当父类和子类中有不重名的方法时 可以是省略super
    }
}
