package interfaceObject;

/**
 * 接口关键字:interface
 * JDK1.7之前的特性
 * 1.接口只能定义静态常量(默认省略public static final),不能定义变量
 * 2.接口也会被编译成字节码文件,然后运行并解释(和class使用时一样的)
 * 3.接口就是对行为的抽象(值得就是抽象方法)
 * 4.接口中支持重载
 * JDK1.8之后的新特性
 *  1.支持默认方法(有方法实现了)
 *  2.支持静态方法
 *  接口中没有构造方法  接口不能直接通过new来实例化  接口中没有初始化代码块(构造代码块)  接口中没有静态代码块
 *  接口中有抽象方法  静态方法  默认方法
 *  接口中只能有静态常量不能有变量
 *  接口的出现弥补了Java单继承的缺陷，更是在设计上通用的规范实现
 */
public interface MyInterface {
    //1.接口只能定义静态常量
   public static final int num = 10 ;
   public  static  int num2 = 10;
   public int num3 = 10;
   int num4 = 10; // 访问修饰符是默认的那种吗?(不是,都是public)

    // 2.接口中定义方法
    public abstract void MethodA(); //抽象方法(接口不知道具体的实现对象完成的功能时什么)
    public void test();
    void add(); // 默认都是public abstract
    void add(int a,int b);

    // 3.默认方法
    public default void show(){
        System.out.println("我是JDK1.8接口的默认方法");
    }

    //4.静态方法
    public static void stop(){
        System.out.println("我是JDK1.8接口的静态方法");
    }

    //5.接口中有构造方法吗?  接口中没有构造方法
    /**public MyInterface(){

    }
     */

    //6.接口中有构造代码块吗? 就是一个大括号

    //7.接口中有静态代码块吗? 就是static
}
