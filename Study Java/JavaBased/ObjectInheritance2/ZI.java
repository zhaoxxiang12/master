package ObjectInheritance2;

import ObjectInheritance.FU;

public class ZI extends FU {
    int num = 20;//成员变量（对象变量）
    int age = 18;
    public void show(){
        int num =100;//局部变量
        System.out.println(num); //就近原则（永远使用范围最近的变量）
        System.out.println(this.num); //当前类的成员变量
        System.out.println(super.num);//父类的成员变量
    }
}
