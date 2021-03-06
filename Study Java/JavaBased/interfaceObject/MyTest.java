package interfaceObject;

/**
 * 常量必须要初始化，并且值不能直接更改
 */
public class MyTest {
    int age; // 变量
    public static int num; // 静态变量(可以共享该变量,这个类中的所有对象都可以共享同一个num)
    public  final int NUMBER=10;  // 常量 (规范：所有字母都大写,单词之间推荐使用下划线分割)
    public static final int JOB_NUMBER = 100; // 静态常量 (以后定义常量的标准方法/语法)
    public static final  double PI = 3.14;

    /**
     * final关键介绍
     * final:最终的
     * final 修饰变量，变量就会变成常量
     * final修饰类:被final修饰过的类不能被继承，有了继承不能用final
     * 被final修饰过的方法，此方法不能被重写(最终方法)
     *
     * 考点：String这个类，能被继承吗？不能被继承，String这个类被final修饰过
     *
     * 用途：一般会做一些规范的数据接口或者特殊的算法
     */

    public static void main(String[] args) {
        MyTest.num = 10;
//        MyTest.JOB_NUMBER = 200; // 被final 修饰过变量不能被赋值
    }

}
