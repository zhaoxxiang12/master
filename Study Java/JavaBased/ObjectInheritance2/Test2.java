package ObjectInheritance2;


public class Test2 {
    public static void main(String[] args) {
        ZI zi = new ZI();
        //子类中成员变量的访问特点(谁调用就找谁,一层一层往上找)
        System.out.println(zi.num);//打印的是子类中num的值,当子类调用时就先从zi中去找一个num,
        // 若子类没有就去父类找,若父类有num,则调用父类的num,若父类没有则编译报错
        System.out.println(zi.sno);

        System.out.println(zi.age);
        zi.info();//子类共享父类的方法
        zi.test();//子类调用自己的方法
    }
}
