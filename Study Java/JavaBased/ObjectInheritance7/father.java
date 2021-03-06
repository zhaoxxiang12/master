package ObjectInheritance7;

public class father {
    public static int num = 10; // 父类的静态变态变量

    static {
        System.out.println("父类的静态代码块");
    }


    public father() {
        super();
        System.out.println("父类的构造方法");
    }



    {
        System.out.println("父类初始化代码块(构造代码块)");
    }
}

