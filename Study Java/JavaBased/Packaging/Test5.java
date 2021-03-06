package Packaging;

/**
 * 方法重载同名不同参
 * 实例变量作用域整个类
 * 接口本质也是抽象类
 * 父类变量表示子类对象
 * 普通方法也可以操作静态方法
 */
public class Test5 {
    private float salary; // 初始化为0.0
    private Float salary2; // 初始化为null  扣光之后的绩效为0.0

    public static void main(String[] args) {
        // 工资  float
        // 包装类型能表示更加广泛的语义
        System.out.println(7.22-7.2);
    }
}
