package interfaceObject;

/**
 * 抽象类
 *  1.抽象类有构造方法,有初始化代码块,静态代码块
 *  2.抽象类不能直接通过new来实例化对象
 *  3.抽象类中可以有各种方法(普通  静态 抽象)
 *  4.抽象类中可以有变量和常量
 *  5.普通类有的特点，抽象类都有
 *  6.抽象类是为了继承而存在,是程序的通用模板,一改全改
 */
public abstract class MyAbstract {
    public int num;
    public  static int num2;
    public  static  final int num3 = 10;
    public MyAbstract(){

    }
    {

    }
    static{

    }
    public void show(){

    }
    public abstract void show2();
}
