package ThreadRunnable;

/**
 * 创建线程方式2
 * class MyRunnable implements Runnable
 * Runnable的出现就是为了解决Java单继承带来的缺陷问题(一个类只能extends一个)
 * <p>
 * Runnable不是线程类，是run()的一个通用规范，可以通过实现Runnable来创建自己的规则（灵活）
 * 要想运行我的这种规则，就必须要开启一个真实的线程对象来处理我们自己写的run()
 */
public class MyRunnable implements Runnable {
    @Override
    public void run() {
        System.out.println("Welcome");
    }
}
