package ThreadWork;

/**
 * 四个售票窗口共同售卖100张票
 * <p>
 * 分析：
 * 1.每个窗口就是一个独立的线程
 * 2.100张票就是4个窗口的共享资源
 *
 * 重点：synchronized修饰方法(同步方法)
 * 普通方法：synchronized就表示的是this
 *
 * 同步本质：就是让其成为一个不可分割的整体
 * 静态方法：当前类的字节码对象 类.class
 * 需要做同步，优先推荐使用同步代码块synchronized(){}
 * 原则：锁住该锁的，不该锁的不要锁(一旦加锁后，程序虽然安全，但是它的并发降低了)
 */
public class Window extends Thread {
    private static int number = 100;

    public Window() {
        super();
    }

    public Window(String name) {
        super(name);
    }

    @Override
    public void run() {//窗口需要做的事情
        while (true) {//窗口是一直开着的
            synchronized (Window.class) { //同步加锁防止共享资源产生竞争
                if (number <= 0) { // 四个线程并发执行  会同时访问共享变量  线程安全 共享资源产生竞争
                    System.out.println("票已售尽");
                    break;
                }
                System.out.println(getName() + "成功售出" + number + "号票");
                number--;
                try {
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
