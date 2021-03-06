package ObjectInheritance7;

/**
 * 1.静态 >构造代码块>构造方法
 * 2.静态变量与代码块的加载顺序取决于代码的位置(谁在上谁先执行)
 */
public class Son extends father{

    static {
        System.out.println("子类的静态代码块");
    }
    public static int age = 18; // 子类的静态变量

    public Son() {
        super();
        System.out.println("子类的构造方法");
    }

    {
        System.out.println("子类的初始化代码块(构造代码块)");
    }

    public static void main(String[] args) {
        new Son();
    }
}
