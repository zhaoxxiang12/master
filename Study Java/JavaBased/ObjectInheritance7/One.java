package ObjectInheritance7;

/**
 *
 */
public class One {
    static {
        System.out.println("静态的代码块");
    }


    public One() {
        super();
        System.out.println("我是构造函数");
    }

    {
        System.out.println("初始化代码块(构造代码块)");
    }

    public static void main(String[] args) {
        new One();
    }
}
