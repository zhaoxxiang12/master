package ObjectInheritance4;

/**
 *构造方法的顺序：先父类后子类
 *
 * super:
 *      super.父类属性
 *      super.父类方法
 *      super() 父类构造
 */
public class Test {
    public static void main(String[] args) {
        ZI zi = new ZI();
//        System.out.println(zi);
        zi.hobby = "打篮球";
        System.out.println(zi.getName());
        zi.show();
       System.out.println("--------------------------------");
        ZI zi2 = new ZI("AA");
        zi2.hobby = "足球";
        System.out.println(zi2.getName());
        zi2.show();
        System.out.println("--------------------------------");


    }
}
