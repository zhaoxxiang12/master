package ThreadWork;

/**
 * 四个售票窗口共同售卖100张票
 * <p>
 * 分析：
 * 1.每个窗口就是一个独立的线程
 * 2.100张票就是4个窗口的共享资源
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
            if (number <= 0) {
                System.out.println("票已售尽");
                break;
            }
            System.out.println(getName() + "成功售出" + number + "号票");
            number--;
        }
    }
}
